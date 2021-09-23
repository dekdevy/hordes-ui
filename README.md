# Hordes.io User Interface
The goal of this repo is to create an open source replacement for the official Hordes.io UI on top of the game client. 
This will likely take a while to get established and used as a learning project for some folks from the community.
For now, you can join the small [discord server](https://discord.gg/jpYjGv7CTb) for this project which includes a guide on how to get started.

Running for development, you'll need to run in simultaneously:
```
npm run dev-tsc
npm run dev-rollup
```

To start the dev server, you can run additionally:
```
npm run dev-server
```
This serves the compiled `ui.js` result to `localhost:8080`.

## Implementation Progress
Heres a list of all the necessary components and to which degree they are currently implemented.

### Basic components
These components represent the basic building blocks of the UI. They are used by advanced components, for example the unit frame implements two bars (HP, MP Bar). Basic components never implement advanced components.

|Component|State|Description
|---|---|---|
|Bar|Started|A vertical bar, able to change width based on a fraction, change color, display a left, right, and center text.|
|Icon|-|A basic square which can be used to display items, buffs and skills. Displays an image, a cooldown overlay, a big centered number, and numbers in the coners. Can drag / receive drop.|
|Panel|-|A panel for free floating UI elements, can display a header, a close button, optionally have a draggable resize corner, be movable and store/restore its position.|

### Advanced components
These components implement unique elements as well as basic components to generate the actual UI.

|Component|State|Description
|---|---|---|
|Char Panel|-|Stats and currently equipped items.|
|Skill Panel|-|List of known skills using icons, draggable into the Skill Bar.|
|PVP Panel|-|Shows players pvp progress / kills / fame last week, as well as arena rating and ranking.|
|Inventory|-|All items owned by the player, current gold / elixir points, and a filter for items by name.|
|Skill Bar|-|A list of draggable icons representing the current player skills. Can be vertical/horizontal and have inputs for row/col size.|
|Unit Frame|-|Show a units health / mana using bars, level, faction, class, buffs and debuffs, casting status. Can be configured for player/target display as well as party display.|
|Experience Bar|-|A bar with an overlay of lines, showing player experience and percentage.|
|Chat|-|The games chat, including input bar and channel separators.|
|Mini Map|-|Shows environment around the player, always visible.|
|Big Map|-|Big map to show a world overview with additional functionality.|
|War Panel|-|Shows active war status.|
|DPS Meter|-|Display damage per second / healing per second by using a list of bars.|
|Settings Panel|-|Display damage per second / healing per second by using a list of bars.|
|Top Panel|-|Access to useful information such as EXP% / IF%, buttons for party creation / queuing, buttons to open other UI panels, quick display of gold / exp per hour, fps / ping etc.|
|Request Panel|-|Pop up to allow for selecting of multiple choices, such as accepting summons or party invitations.|
|Merchant Panel|-|Allows buying / selling of items.|
|Blacksmith Panel|-|Upgrading items.|
|Trader Panel|-|Buying items from a fixed list.|
|Conversation Panel|-|Generic NPC interaction channel to allow a multiple choice selection (Conjurer, sage).|
|Context Menu|-|A context pop up menu to allow for a multiple choice selection.|
|Hover Panel|-|Shows information about a skill / item / buff / creature when hovering.|

### Development tools
Outside of the above components, this repository will provide useful tools that are not part of the UI but help development / testing.
|Task|State|Description|
|---|---|---|
|Component Testbed|-|Test and inspect individual components, fill them with representative values at random.|
|Performance Measurement|-|Spawn many components that are performance critical (bars, unit frames, buffs, items, etc), filling them with representative data and providing performance information.|
|Game Testbed|-|Mimic the game UI by spawning all components in their representative positions, allowing for testing of UI interactions such as dragging items across skillbar / inventory, etc.|
