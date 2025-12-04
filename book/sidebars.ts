import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Module 1: The Robotic Nervous System – ROS 2',
      items: [
        '01-ros-2/01-concepts',
        '01-ros-2/02-urdf',
        '01-ros-2/03-rclpy',
      ],
    },
    {
      type: 'category',
      label: 'Module 2: The Digital Twin – Gazebo & Unity',
      items: [
        '02-simulation/01-physics',
        '02-simulation/02-environment',
        '02-simulation/03-sensors',
      ],
    },
    {
      type: 'category',
      label: 'Module 3: The AI-Robot Brain – NVIDIA Isaac',
      items: [
        '03-nvidia-isaac/01-isaac-sim',
        '03-nvidia-isaac/02-isaac-ros',
        '03-nvidia-isaac/03-navigation',
        '03-nvidia-isaac/04-reinforcement-learning',
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action (VLA)',
      items: [
        '04-vla/01-whisper',
        '04-vla/02-llm-planning',
        '04-vla/03-vision-models',
        '04-vla/04-action-execution',
      ],
    },
    {
      type: 'category',
      label: 'Module 5: Capstone',
      items: [
        '05-capstone/01-overview',
        '05-capstone/02-integration',
        '05-capstone/03-sim-to-real',
        '05-capstone/04-demonstration',
      ],
    },
  ],
};

export default sidebars;