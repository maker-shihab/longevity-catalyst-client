import { FiCheckCircle, FiFacebook, FiSettings, FiTwitter, FiUsers } from 'react-icons/fi';

const projectCards = [
  {
    title: 'Description',
    desc: 'Streamline Your Social Media Marketing - Everything You Need in One Convenient Place',
    bg_img: 'assets/img/trading-project-bg-1.jpeg',
  },
  {
    title: 'Description',
    desc: 'Streamline Your Social Media Marketing - Everything You Need in One Convenient Place',
    bg_img: 'assets/img/trading-project-bg-1.jpeg',
  },
  {
    title: 'Description',
    desc: 'Streamline Your Social Media Marketing - Everything You Need in One Convenient Place',
    bg_img: 'assets/img/trading-project-bg-1.jpeg',
  }
];

const chooseData = [
  {
    icon: <FiUsers />,
    title: 'Longevity Catalyst',
    desc: 'Understand what matters to our employees. Give them what they need to do their best work.',
  }, {
    icon: <FiSettings />,
    title: 'Longevity Catalyst',
    desc: 'Understand what matters to our employees. Give them what they need to do their best work.',
  }, {
    icon: <FiCheckCircle />,
    title: 'Longevity Catalyst',
    desc: 'Understand what matters to our employees. Give them what they need to do their best work.',
  },
  {
    icon: <FiCheckCircle />,
    title: 'Longevity Catalyst',
    desc: 'Understand what matters to our employees. Give them what they need to do their best work.',
  }
  , {
    icon: <FiCheckCircle />,
    title: 'Longevity Catalyst',
    desc: 'Understand what matters to our employees. Give them what they need to do their best work.',
  }
  , {
    icon: <FiCheckCircle />,
    title: 'Longevity Catalyst',
    desc: 'Understand what matters to our employees. Give them what they need to do their best work.',
  },
];
const socialIcons = [
  <FiTwitter key="twitter" />,
  <FiFacebook key="facebook" />,
]
const membersData = [
  {
    icon: 'assets/img/team-member-1.jpeg',
    title: 'Mark Hamalainen',
    subTitle: 'Co-Executive Director',
    desc: "Mark's career has progressed from manual bench work in academia",
    socailIcons: socialIcons,
  }, {
    icon: 'assets/img/team-member-1.jpeg',
    title: 'Mark Hamalainen',
    subTitle: 'Co-Executive Director',
    desc: "Mark's career has progressed from manual bench work in academia",
    socailIcons: socialIcons,
  }, {
    icon: 'assets/img/team-member-1.jpeg',
    title: 'Mark Hamalainen',
    subTitle: 'Co-Executive Director',
    desc: "Mark's career has progressed from manual bench work in academia",
    socailIcons: socialIcons,
  },
];

export const data = {
  projectCards,
  chooseData,
  membersData
}
