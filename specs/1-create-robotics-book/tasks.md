# Tasks: Physical AI & Humanoid Robotics Book

**Input**: Design documents from `/specs/1-create-robotics-book/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Organization**: Tasks are grouped by phase. The core content creation maps to a single, large user story (US1).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the Docusaurus project structure.

- [x] T001 Initialize a new Docusaurus classic project in the `book/` directory.
- [x] T002 [P] Configure linting (e.g., markdownlint) and formatting (e.g., Prettier) tools for the `book/` directory.
- [x] T003 [P] Set up a basic Git LFS for any large assets (e.g., high-resolution diagrams, videos).

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Configure the core structure and navigation of the book.

**⚠️ CRITICAL**: No content writing can begin until this phase is complete.

- [x] T004 Configure `docusaurus.config.js` with the book's title, tagline, and GitHub Pages deployment settings.
- [x] T005 Create the sidebar navigation structure in `book/sidebars.js` to match the modules defined in `data-model.md`.
- [x] T006 Create the main introduction page `book/docs/intro.md` with an overview of the book.
- [x] T007 Create placeholder files and directories for all chapters defined in `data-model.md` (e.g., `book/docs/01-ros2-fundamentals/intro.md`).

**Checkpoint**: Foundation ready - content writing can now begin.

---

## Phase 3: User Story 1 - Complete Book Content (Priority: P1) 🎯 MVP

**Goal**: Write all modules and chapters of the book as defined in the data model.

**Independent Test**: Each module can be considered complete when all its chapters are written, reviewed, and all code examples within it are functional.

### Implementation for User Story 1

**Module 1: The Robotic Nervous System – ROS 2**
- [x] T008 [P] [US1] Write Chapter 1.1: Introduction to ROS 2 Concepts in `book/docs/01-ros-2/01-concepts.md`
- [x] T009 [P] [US1] Write Chapter 1.2: Creating a Humanoid Description (URDF) in `book/docs/01-ros-2/02-urdf.md`
- [ ] T010 [P] [US1] Write Chapter 1.3: The Python Bridge: `rclpy` for AI Agents in `book/docs/01-ros-2/03-rclpy.md`

**Module 2: The Digital Twin – Gazebo & Unity**
- [ ] T011 [P] [US1] Write Chapter 2.1: Fundamentals of Physics Simulation in `book/docs/02-simulation/01-physics.md`
- [ ] T012 [P] [US1] Write Chapter 2.2: Designing a Digital Environment in `book/docs/02-simulation/02-environment.md`
- [ ] T013 [P] [US1] Write Chapter 2.3: Simulating Sensors (LiDAR, Camera, IMU) in `book/docs/02-simulation/03-sensors.md`

**Module 3: The AI-Robot Brain – NVIDIA Isaac**
- [ ] T014 [P] [US1] Write Chapter 3.1: Photorealistic Training with Isaac Sim in `book/docs/03-nvidia-isaac/01-isaac-sim.md`
- [ ] T015 [P] [US1] Write Chapter 3.2: Accelerated Perception with Isaac ROS in `book/docs/03-nvidia-isaac/02-isaac-ros.md`
- [ ] T016 [P] [US1] Write Chapter 3.3: Navigation and Mapping (VSLAM, Nav2) in `book/docs/03-nvidia-isaac/03-navigation.md`
- [ ] T017 [P] [US1] Write Chapter 3.4: Intro to Reinforcement Learning in `book/docs/03-nvidia-isaac/04-reinforcement-learning.md`

**Module 4: Vision-Language-Action (VLA)**
- [ ] T018 [P] [US1] Write Chapter 4.1: Voice to Text with Whisper in `book/docs/04-vla/01-whisper.md`
- [ ] T019 [P] [US1] Write Chapter 4.2: Planning and Reasoning with LLMs in `book/docs/04-vla/02-llm-planning.md`
- [ ] T020 [P] [US1] Write Chapter 4.3: Object Recognition with Vision Models in `book/docs/04-vla/03-vision-models.md`
- [ ] T021 [P] [US1] Write Chapter 4.4: Executing Actions in ROS 2 in `book/docs/04-vla/04-action-execution.md`

**Module 5: Capstone – Autonomous Humanoid / Proxy Robot**
- [ ] T022 [P] [US1] Write Chapter 5.1: Project Overview and Setup in `book/docs/05-capstone/01-overview.md`
- [ ] T023 [P] [US1] Write Chapter 5.2: Integrating the Full Pipeline in `book/docs/05-capstone/02-integration.md`
- [ ] T024 [P] [US1] Write Chapter 5.3: Sim-to-Real Transfer and Deployment in `book/docs/05-capstone/03-sim-to-real.md`
- [ ] T025 [P] [US1] Write Chapter 5.4: Final Demonstration and Evaluation in `book/docs/05-capstone/04-demonstration.md`

**Checkpoint**: At this point, the first draft of the entire book should be complete.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final review, cleanup, and deployment.

- [ ] T026 [P] Perform a full technical review of all chapters and code examples.
- [ ] T027 [P] Proofread the entire book for grammar, spelling, and clarity.
- [ ] T028 Perform a plagiarism check on the final manuscript.
- [ ] T029 Validate all Mermaid diagrams and code snippets render correctly in a local Docusaurus build.
- [ ] T030 Deploy the final book to GitHub Pages using Docusaurus deployment commands.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Must be completed first.
- **Foundational (Phase 2)**: Depends on Setup. Blocks all content writing.
- **User Story 1 (Phase 3)**: Depends on Foundational. This is the main implementation phase.
- **Polish (Phase 4)**: Depends on the completion of all content in Phase 3.

### Content Dependencies

- While individual chapters within a module are marked as parallel (`[P]`), it is highly recommended to complete **modules sequentially** (Module 1 → Module 2 → etc.) to maintain a logical narrative and build-up of concepts.
- The Capstone module (Module 5) is strictly dependent on all other modules being complete.

---

## Implementation Strategy

### MVP First (Sequential Module Delivery)

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational
3.  Complete all tasks for **Module 1**. Stop and validate this module is coherent and its code works.
4.  Incrementally complete, validate, and deliver each subsequent module.
5.  After all modules are complete, proceed to Phase 4: Polish & Deployment.

This approach ensures that a valuable, self-contained portion of the book is completed and validated at each step, reducing the risk of large-scale revisions later.
