import autobiography from '../assets/icons/1_Autobiography.svg';
import managingWorkforce from '../assets/icons/2_Managing Workforce.svg';
import successReceipes from '../assets/icons/3_Success Recipes.svg';
import procrastinationKillers from '../assets/icons/4_Procrastination killers.svg';
import mindTabs from '../assets/icons/5_Mind Tabs.svg';
import findingYourself from '../assets/icons/6_Finding Yourself.svg';
import breakingYourLimits from '../assets/icons/7_Breaking Your Limits.svg';
import decisionMaking from '../assets/icons/8_Decision Making.svg';
import innovationAndCreativity from '../assets/icons/9_Innovation and Creativity.svg';
import productivityVitamin from '../assets/icons/10_Productivity Vitamin.svg';
import communityBuilder from '../assets/icons/11_Community Builder.svg';
import yourHabits from '../assets/icons/12_Your Habits.svg';
import networkWeb from '../assets/icons/13_Network Web.svg';
import productivityHill from '../assets/icons/14_Productivity Hill.svg';
import mindfullness from '../assets/icons/15_Mindfullness.svg';
import understandingHumans from '../assets/icons/16_Understanding Humans.svg';
import timeManagement from '../assets/icons/17_Time Management.svg';
import aCompanysInsider from '../assets/icons/18_A Companys Insider.svg';
import businessNumeracy from '../assets/icons/19_Business Numeracy.svg';
import businessStrategy from '../assets/icons/20_Business Strategy.svg';
import artOfPersuasion from '../assets/icons/21_Art of Persuasion.svg';
import emotions from '../assets/icons/22_Emotions.svg';
import leadership from '../assets/icons/23_Leadership.svg';
import startups from '../assets/icons/24_Startups.svg';
import technology from '../assets/icons/25_Technology.svg';
import productDevelopment from '../assets/icons/26_Product Development.svg';
import finances from '../assets/icons/27_Finances.svg';
import communication from '../assets/icons/28_Communication.svg';
import branding from '../assets/icons/29_Branding.svg';
import teamwork from '../assets/icons/30_Teamwork.svg';
import problemSolving from '../assets/icons/31_Problem Solving.svg';
import bestseller from '../assets/icons/best-seller.svg';

const additionalCategories = [
    {
        id: 32,
        name: 'The New York Times - Business',
        image: bestseller,
    },

    {
        id: 39,
        name: 'Financial Times and McKinsey',
        image: bestseller,
    },
    {
        id: 34,
        name: 'Amazon - Business',
        image: bestseller,
    },
    {
        id: 36,
        name: 'Forbes - Business',
        image: bestseller,
    },
    {
        id: 33,
        name: 'The Wall Street Journal',
        image: bestseller,
    },
    {
        id: 37,
        name: 'Goodreads - Business',
        image: bestseller,
    },
    {
        id: 35,
        name: 'Amazon - Personal Development',
        image: bestseller,
    },
    {
        id: 38,
        name: 'Barnes and Noble',
        image: bestseller,
    },

];

const mainCategories = [
    {
        id: 1,
        name: 'Autobiography/Biography',
        image: autobiography,
    },
    {
        id: 2,
        name: 'Managing Workforce',
        image: managingWorkforce,
    },
    {
        id: 3,
        name: 'Success Recipes',
        image: successReceipes,
    },
    {
        id: 4,
        name: 'Procrastination Killers',
        image: procrastinationKillers,
    },
    {
        id: 5,
        name: 'Mind Tabs',
        image: mindTabs,
    },
    {
        id: 6,
        name: 'Finding Yourself',
        image: findingYourself,
    },
    {
        id: 7,
        name: 'Breaking Your Limits',
        image: breakingYourLimits,
    },
    {
        id: 8,
        name: 'Decision Making',
        image: decisionMaking,
    },
    {
        id: 9,
        name: 'Innovation and Creativity',
        image: innovationAndCreativity,
    },
    {
        id: 10,
        name: 'Productivity Vitamin',
        image: productivityVitamin,
    },
    {
        id: 11,
        name: 'Community Builder',
        image: communityBuilder,
    },
    {
        id: 12,
        name: 'Your Habits',
        image: yourHabits,
    },
    {
        id: 13,
        name: 'Network Web',
        image: networkWeb,
    },
    {
        id: 14,
        name: 'Productivity Hill',
        image: productivityHill,
    },
    {
        id: 15,
        name: 'Mindfulness',
        image: mindfullness,
    },
    {
        id: 16,
        name: 'Understanding Humans',
        image: understandingHumans,
    },
    {
        id: 17,
        name: 'Time Management',
        image: timeManagement,
    },
    {
        id: 18,
        name: "A Company's Insider",
        image: aCompanysInsider,
    },
    {
        id: 19,
        name: 'Business Numeracy',
        image: businessNumeracy,
    },
    {
        id: 20,
        name: 'Business Strategy',
        image: businessStrategy,
    },
    {
        id: 21,
        name: 'Art of Persuasion',
        image: artOfPersuasion,
    },
    {
        id: 22,
        name: 'Emotions',
        image: emotions,
    },
    {
        id: 23,
        name: 'Leadership',
        image: leadership,
    },
    {
        id: 24,
        name: 'Startups',
        image: startups,
    },
    {
        id: 25,
        name: 'Technology',
        image: technology,
    },
    {
        id: 26,
        name: 'Product Development',
        image: productDevelopment,
    },
    {
        id: 27,
        name: 'Finances',
        image: finances,
    },
    {
        id: 28,
        name: 'Communication',
        image: communication,
    },
    {
        id: 29,
        name: 'Branding',
        image: branding,
    },
    {
        id: 30,
        name: 'Teamwork',
        image: teamwork,
    },
    {
        id: 31,
        name: 'Problem Solving',
        image: problemSolving,
    },
];

mainCategories.sort((a, b) => a.name.localeCompare(b.name));

const categoriesData = [...additionalCategories, ...mainCategories]

export default categoriesData;
