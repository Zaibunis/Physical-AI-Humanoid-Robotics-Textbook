import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'deployment-guide',
    {
      type: 'category',
      label: 'Module 1: The Robotic Nervous System – ROS 2',
      items: [
        'ros-2/concepts',
        'ros-2/urdf',
        'ros-2/rclpy',
      ],
    },
    {
      type: 'category',
      label: 'Module 2: The Digital Twin – Gazebo & Unity',
      items: [
        'simulation/physics',
        'simulation/environment',
        'simulation/sensors',
      ],
    },
    {
      type: 'category',
      label: 'Module 3: The AI-Robot Brain – NVIDIA Isaac',
      items: [
        'nvidia-isaac/isaac-sim',
        'nvidia-isaac/isaac-ros',
        'nvidia-isaac/navigation',
        'nvidia-isaac/reinforcement-learning',
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action (VLA)',
      items: [
        'vla/whisper',
        'vla/llm-planning',
        'vla/vision-models',
        'vla/action-execution',
      ],
    },
    {
      type: 'category',
      label: 'Module 5: Capstone',
      items: [
        'capstone/overview',
        'capstone/integration',
        'capstone/sim-to-real',
        'capstone/demonstration',
      ],
    },
  ],
};

export default sidebars;