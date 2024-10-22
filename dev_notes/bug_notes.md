bug notes


jittering otherPlayer x-wing on multiplayer

it's fine when one x-wing is paused, but not when both are running


I've probably eliminated the following:
- it's not the two x-wings since getting rid of one doesn't solve the problem
- it doesn't appear to be otherPlayerXWing.position because the data for that is correct
- it doesn't appear to be the camera movement because the issue still happens with a fixed camera
- it's not the lerp, since replacing the lerp with a static increment doesn't help
- The speed is not the issue anything above zero shows the problem.
- The camera inside the player group doesn't seem to be a problem
- Problem appears in Chrome and Firefox, so it thankfully doesn't seem to be a browser thing.


Why does pausing one x-wing seem to fix things?
- Could it be the fact that the camera is inside the player group? What happens if I move the camera out?
  - No (thank goodness). The same issue occurs if I remove the camera from the player group.
- The position is the only thing that seems bugged. The quaternion is fine.
- There didn't seem to be any errors in the usage of `.current`
- What about the connection id? I should be using that, right? Never mind, I'm already using it correctly.
- The thing that confuses me is why the position would be bugged if the position data is correct.
  - Is the x-wing rendering weirdly? Is there some crucial behavior in Player that's not in XWing?
- Could it have to do with nested refs? But then why would the rotation work?
- Found something interesting
- Introducing a third x-wing really messes things up. I see `otherPlayerXWing is null`
- Maybe there's some problem with how I'm looping through the multiple potential players
  - Let me try it in a way that there's only one other player (and eliminate the loops)
  - Didn't fix the issue. The looping appears to have a problem of its own, but it looks like it has nothing to do with the position jittering. 
- Is there a camera refresh on movement? No, the problem persists when the camera is stationary.
- Could the movement of player 1 cause the issues?
  - The higher the speed, the more pronounced the effect
  - Could any of the position updates be sharing a reference?
  - What if something's happening with the useFrame scheduling?
- Okay now I see the issue. The camera updates and the other player updates don't happen on the same cadence. When going in opposite directions, this is fine, but when going in the same direction, the camera and the other player are taking turns moving forwards, thus creating what looks like a jitter.
  - More accurately, the camera is moving forward smoothly, and the player2 is falling behind then jumping ahead. That's why it only seems to happen when player1 is moving. That's also why it only seems to be a problem when both players are headed in the same direction.
    - The lerp is critically important in fixing this. Without that, player2 will keep falling behind and catching up.
    - This is all fine and dandy but at higher speeds the effect becomes more pronounced. That's because higher speeds expose the gaps between lerp increments.
    - Hardcoding a smaller `fractionOfLerpCompletedPerFrame` makes it look better, but it's a little wrong, a little faked, and unpredictable by frame rate. It also gets really laggy the smaller the fraction we use.
    - Is it possible that `secondsBetweenWebsocketTransmissions` is wrong? Maybe. Check.
      - Actually I think it's irrelevant because by the time the position arrives, the x-wing already needs to be there. That means there will be two sources of lag: the network plus the lerp. The lerp lag can be addressed with predictive rollback or by increasing the socket refresh rate to 60fps. However, the smoothness of the motion is what matters, not the offset.
      - So that means the `secondsBetweenWebsocketTransmissions` actually becomes very relevant since the movement rate's consistency is more important than its offset.
        - Now I just need to figure out why the time between updates reported by performance.now seems very wrong.

- Try:
  - Hardcoded forward movement (with constant then delta)
    - Both the constant and the delta completely fix the jittering problem
    - That means I should take another look at the lerp
  - Fixed camera [never mind now that the other part worked]

- I think I see the issue. [never mind]
  - The position of the x-wing is changing at the same rate as the socket updates, but it should be much faster since the x-wing changes should be happening more frequently.
  - Hmm when I do the frame count, I see it updating and jumping by a lot. That suggests the frames are happening and registering but the chrome inspector is throttled.
    - But when testing this theory (by putting a console log to see if it would acknowledged having reached a certain number), the log didn't happen. Wait I just forgot to put `.current`. At least that's good. It means the chrome inspector is just being throttled, which makes sense and tells me there isn't something bad going on here.
- Increments per unit of time are not even. Why?
  - Let's look at the variables.
    - old position
    - new position
    - fraction of increment
  - Wait, am I looking at the wrong old position?

- new `end` position comes in from the socket
- we have 100ms to get from the old socket `start` position to the new socket `end` position
- first step, we travel a fraction of the gap between `start` and `end`
- second step, we travel a fraction of the gap between `start` and `end`
  - but what is `start` (the beginning of the socket interval or the current position of the x-wing)?
    - Let's check if I'm using the wrong `start` and `end`
    - I am using the wrong start!
      - Looking at the code for [Vector3.lerp](https://github.com/mrdoob/three.js/blob/master/src/math/Vector3.js#L455-L463), I see that it mutates the beginning and you should run it again without changing the beginning. That way, you progress by a uniform fraction each time. What I'm doing is an accidental geometric progression where I'm doing the classic "go half of the way to the distance at each step". That means the movement is fast and then becomes slow and then fast again and slow again at each interval between socket transmissions.
      - Update: I tried using the previously stored position and it made the whole thing even more jittery.
      - Wait I might just have the order of operations/updates wrong! I'll try adjusting when I update "previous" for everything.
  - and what is the fraction of? (it should be the fraction of the total from `start` to `end`, not `current` to `end`)
    - Is it possible I have the wrong fraction? Am I using the fraction from `current` to `end` rather than `start` to `end`?
      - No I'm using the correct fraction (based on the time between websocket broadcasts)
      - But I have an assumption wrong. The websocket broadcasts might not always be 100ms, so let's check. Due to a network's inherent unpredictability, I suspect 100ms is just a target.
  - `framesBetweenSocketTransmissions` varies between 5 to 8, but what about the time?
    - The time between socket transmissions varies from around 60 to around 150 (sometimes more in either direction)
    - That would wildly throw off a calculation that's expecting 100 every time!
    - I'll use the actual time between broadcasts instead and see how it looks
- My solutions so far have been increasingly sound from a math standpoint, but there's just too much changing with too much required precision and timing.
- Maybe instead I can just set the position to the next transmission and then determine the number of needed lerp steps by the speed of the vehicle and the distance to the next point
  - Transmit speed scalar
  - Get absolute distance
  - Actually no, if I'm already getting the distance and I'm already getting the elapsed time, then I have the speed info without further effort.
- Before all that, what if I just hardcoded to make one step per frame
  - smoother, but too slow to update
- What about changing the liveblocks throttle to 16ms (for 60fps) instead of 100ms?
  - That improved things somewhat, but it might just be papering over the real issue.

- Random thought: how is the camera position being updated?
  - It's moving as part of the group (the rotational movement is irrelevant to the jitter)
  - Whoa I just noticed something!
  - updatePresence is being called on every frame but of course the socket connection can't keep up!
    - what happens if I throttle it?
    - Throttling makes the bug worse but makes it visually clearer to understand.
    - What happens if I throttle our client updates to the same cadence?
      - Still just makes the problem look visually clearer.

- Unfortunately it sounds like what we really want is just more frequent updates.
- Actually what if we want **less** frequent updates?
  - Maybe the attempt at precision was creating too many problems with network latency. (e.g. there are a lot of variables and if even one of them changes from 0.1 to 0.2, for example, then whatever we were trying to calculate gets doubled)
  - What if we throttle the updates and use evenly spaced increments to move smoothly?
  - Not sure if that'll really help. That might just make the jitters fewer and farther between.
  - Maybe we can use the server as the source of truth for all movement instead of the client?
  - That wouldn't fix the unevenness.

- ⭐️ I have an idea. What if I use the velocity instead of the position?
  - Yeah it will desync a bit over time and need to be adjusted, but the velocity changes much less often than the position, so we should see a smoother flight. I'll try it.
  - This worked nicely!
  - It makes sense because if a ship and an observer are traveling next to each other at the same speed, they'll seem to be going at zero speed relative to each other. Any deviations in velocity will be very noticeable, and that's why I was observing a lot of jittering back and forth. It's kind of like how if a car drives by you at roughly 30mph, it'll look like it's going at a constant speed even if it changes to 29mph or 31mph. However if you're both traveling at the same speed and one car accelerates a bit more, it becomes very noticeable.

- Now I need to figure out why the same axes of the same objects are swapped and flipped for the other players.
  - The numerical result is correctly passed into `otherPlayerPresence`, but the resulting render is wrong.
  - Am I targeting the wrong object somehow? Let's find out.
    - It appears I'm targeting the wrong object! When I check the name, I get `pitch_and_roll_box` for player 1 and an empty string for player 2! The parent is listed as the "Scene" (the top level of the 3D model). This explains so much.
    - Hmm the whole dom seems to have had it's names stripped for other instances of the XWing component.
      - First I'll check if the changing of the refs causes issues. [nope]
      - Next I'll check the react inspector to see how the components look.
        - Oh interesting. The model isn't made up of real components since react three fiber is just a thin wrapper around vanilla threeJS. Only the XWing components show up, and they contain Object3D components.
        - So now we should see how to use multiple instances of a model in react three fiber
        - Great news: the structure is preserved for multiple instances of the same component. For some reason the ref is just landing on the top level of the XWing model instead of passing itself down to the `pitch_and_roll_box` group. Seeing the nested children shows that the structure is still there.
  - Updated question: why is the `pitch_and_roll_box` ref referring to the top level group of the model for player 2 (specifically the one just above `xWingRef`)?
    - Could it be that they're all starting with empty ref and referring to the same thing? That would also explain why rotating one of the refs seems to mess with the all the others! I really think this could be it. Let me check.
    - Yep confirmed all the elements are sharing the same ref.
    - Solved by spreading emptyRef into a new object instead of using the same reference by mistake

- Now I'm aiming to make the player 2 rotation smoother
  - Right now, I'm just setting rotations and I could be lerping instead. Maybe the original quaternion slerp will be fine. I'll try that.
  - All fixed!
