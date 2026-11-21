# escaping-the-blood-moon
WEB115 Final Project — Escaping the Blood Moon: The Keeper's Curse

# Game Description and Game Play
The scroll reads: "The Moonstone lies hidden beneath this very castle... the Keeper has searched for it for centuries. Beware of him, the Blood Moon has twisted his mind! Long ago, the Professor sought to stop the Keeper and conceal the Moonstone from those who would misuse its power. To protect the artifact, the castle was sealed and its secrets buried beneath stone and shadow. If the Blood Moon rises before the Moonstone can be secured, the curse will claim yet another victim. Tread carefully..."

Overview - The blood moon is rising. As Lancelot travels through the strange forest, curiosity leads him into a dilapidated castle and into its dark dungeon. He reads a scroll tacked onto the wall. Alas, the trap is sprung -- the opening closes, a timer starts, and he must uncover clues from the various items strewn about before the timer ends and he perishes -- or worse!

Interactivity - 


Endings -


# Group Member Roles
All - Contribute to the pseudo code and Mermaid diagram.
    - Participate in the overall game play development.

Kris - Creates visual assets for the game. 
     - Initializes the html file.

Christie - Develops JavaScript game mechanics and interactions.
         - Creates and integrates the Mermaid flowchart.
         - Coordinates GitHub integration and rubric verification.

# Story Flowchart / Mermaid Diagram

```mermaid
flowchart TD
    A["Dark dungeon scene loads"]
    B["Only illuminated scroll is interactive"]
    C["Player opens scroll"]
    D["Read introduction and instructions"]
    E["Click Start"]
    F["Play sliding brick wall sound"]
    G["Load lit dungeon with stairway sealed"]
    H["Enable objects and start 5-minute timer"]
    I["Explore dungeon"]

    J["Investigate books, shackles, and other objects"]
    K["Read story clues and update journal"]

    L["Click spiderweb"]
    M["Subtract 10 seconds"]
    N{"Time remaining?"}

    O["Search rubble"]
    P["Find and collect key"]

    Q["Find and collect Moonstone"]
    R["Read inscription: ROWAN"]

    S["Consult crystal ball"]
    T{"Fewer than 3 hints used?"}
    U["Show next hint and increment counter"]
    V["Nothing more to reveal"]

    W["Click dungeon door"]
    X{"Has key?"}
    Y["Door remains locked"]
    Z{"Escape now or continue exploring?"}

    AA{"Has Moonstone?"}
    AB["Leave without uncovering the truth"]
    AC{"Attempt ROWAN challenge?"}
    AD["Name input appears"]
    AE["Enter name and submit"]
    AF{"Entered ROWAN?"}
    AG["Incorrect name message"]
    AH{"Choose next action"}

    AI["Ending 1: Truth Revealed"]
    AJ["Ending 2: Mystery Remains"]
    AK["Ending 3: Keeper's Curse"]

    A --> B --> C --> D --> E --> F --> G --> H --> I

    I --> J --> K --> I

    I --> L --> M --> N
    N -->|Yes| I
    N -->|No| AK

    I --> O --> P --> I
    I --> Q --> R --> I

    I --> S --> T
    T -->|Yes| U --> I
    T -->|No| V --> I

    I --> W --> X
    X -->|No| Y --> I
    X -->|Yes| Z

    Z -->|Continue Exploring| I
    Z -->|Escape Now| AA

    AA -->|No| AB --> AJ
    AA -->|Yes| AC

    AC -->|Leave Without Truth| AJ
    AC -->|Enter Name| AD --> AE --> AF
    AC -->|Continue Exploring| I

    AF -->|Yes| AI
    AF -->|No| AG --> AH

    AH -->|Try Again| AD
    AH -->|Continue Exploring| I
    AH -->|Leave Without Truth| AJ

    H -.->|Timer expires during gameplay| AK
    I -.->|Timer reaches zero| AK
    Z -.->|Timer expires| AK
    AC -.->|Timer expires| AK
    AH -.->|Timer expires| AK
```
