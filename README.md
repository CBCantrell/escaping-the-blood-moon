# escaping-the-blood-moon
WEB115 Final Project — Escaping the Blood Moon: The Keeper's Curse

# Game Description and Game Play
The scroll reads: "The Moonstone lies hidden beneath this very castle... the Keeper has searched for it for centuries. Beware of him, the Blood Moon has twisted his mind! Long ago, the Professor sought to stop the Keeper and conceal the Moonstone from those who would misuse its power. To protect the artifact, the castle was sealed and its secrets buried beneath stone and shadow. If the Blood Moon rises before the Moonstone can be secured, the curse will claim yet another victim. Tread carefully..."

Overview - The blood moon is rising. As Lancelot travels through the strange forest, curiosity leads him into a dilapidated castle and into its dark dungeon. He reads a scroll tacked onto the wall. Alas, the trap is sprung -- the opening closes, a timer starts, and he must uncover clues from the various items strewn about before the timer ends and he perishes -- or worse!

Interactivity - Player explores the dungeon by clicking on different objects to uncover clues, collect items, and progress through the story. Each interaction can reveal information, affect the countdown, or help determine the player's ending.

- **Scroll:** The player reads the illuminated scroll to understand the introduction and instructions. Clicking Start triggers the dungeon entrance sealing, activates the interactive objects, and begins the five-minute countdown.

- **Books, Shackles, and Other Objects:** Players can investigate objects throughout the dungeon to discover information about the castle, its history, and the Keeper. One of the books reveals information about Sir Rowan, a knight who entered the castle centuries ago and became cursed by the Blood Moon. This clue helps players recognize the significance of the scrambled letters found on the Moonstone. Important discoveries are recorded in the journal.

- **Spiderweb:** Clicking the spiderweb subtracts 10 seconds from the countdown, giving the player less time to escape.

- **Rubble:** The player searches the rubble and discovers a Key hidden underneath.

- **Key:** The player collects the Key, which is added to the inventory. The key is required to physically unlock the dungeon door, but the player does not need to solve the mystery to escape.

- **Moonstone:** The player discovers and collects the Moonstone, revealing the scrambled inscription AWRNO. Players must unscramble the letters to discover the name ROWAN and determine where to use it. The clue found in one of the dungeon books can help players solve the puzzle, but reading the book is not required to enter the correct answer.

- **Crystal Ball:** The player can consult the crystal ball for up to three hints. Once all three hints have been used, no additional hints are available.

- **Dungeon Door:** Clicking the dungeon door checks whether the player has collected the Key. Without the key, the door remains locked. With the key, the player can choose to escape immediately or continue exploring the dungeon.

- **Name Challenge:** If the player has collected the Moonstone, they have the option to enter the name associated with its scrambled inscription at the dungeon door. The correct answer is ROWAN. Players can use the clue from the book or solve the puzzle independently. Entering the correct name reveals the Keeper's true identity and unlocks the best ending. Incorrect answers allow the player to try again, continue exploring, or leave without uncovering the truth.

- **Countdown Timer:** The player has five minutes to escape. The timer continues while the player explores, investigates objects, and attempts the final challenge. If the countdown reaches zero before the player escapes, the Keeper's Curse ending is triggered.

The game tracks collected items, discovered clues, hints used, and remaining time. Players can choose whether to focus on escaping immediately or continue investigating the mystery before leaving.

Endings - The game has three possible endings determined by the player's choices, discoveries, and remaining time.

- **Ending 1: The Truth Revealed (Best Ending):** Lancelot collects the key and Moonstone, discovers the scrambled inscription AWRNO, and successfully unscrambles it to enter ROWAN at the dungeon door. This reveals that the Keeper was once Sir Rowan, a knight who became cursed by the Blood Moon. Lancelot uncovers the castle's history and escapes with the Moonstone, protected from the curse.

- **Ending 2: The Mystery Remains (Neutral Ending):** Lancelot collects the Key and unlocks the dungeon door but chooses to leave without solving the mystery. He escapes safely, but the truth about the Keeper, the Moonstone, and the castle's curse remains unknown. This ending can occur whether the player never collects the Moonstone or chooses not to complete the name challenge.

- **Ending 3: The Keeper's Curse (Worst Ending):** The five-minute countdown reaches zero before Lancelot escapes. The Blood Moon's curse takes hold, transforming him into the next Keeper and trapping him within the castle.


# Group Member Roles
All - Contribute to the pseudo code and Mermaid diagram.
    - Participate in the overall game play development.

Kris - Creates visual assets for the game. 
     - Initializes the html file.

Christie - Develops JavaScript game mechanics and interactions.
         - Creates and integrates the Mermaid flowchart.
         - Coordinates GitHub integration and rubric verification.

Maria - Develops the storyline, characters, and narrative structure.
      - Plans dungeon objects, player interactions, and story progression.
      - Develops the three possible endings and their conditions.
      -Initializes the  CSS file.

# Story Flowchart / Mermaid Diagram
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
    K["Read story clues, including Sir Rowan's history in a book, and update journal"]
    L["Click spiderweb"]
    M["Subtract 10 seconds"]
    N{"Time remaining?"}

    O["Search rubble"]
    P["Find and collect key"]

    Q["Find and collect Moonstone"]
    R["Read scrambled inscription: AWRNO"]

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