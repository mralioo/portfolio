import profile from './profile.jpg';
import { faAppStore, faGithub, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { } from '@fortawesome/free-solid-svg-icons';

export const navigation = {
	name: "Ali Alouane",
	links: [
		{
			title: "About",
			link: "#about",
		},
		{
			title: "Projects",
			link: "#projects",
		},
		{
			title: "Contact",
			link: "#contact",
		},
		{
			title: "Links",
			link: "/links",
		},
	],
}
export const intro = {
    title: "Hey, I'm Ali",
    description: "A Machine Learning Engineer.",
    image: profile.src,
    buttons: [
        {
            title: "Contact Me",
            link: "#contact",
            isPrimary: true,
        },
        {
            title: "Resume",
            link: "https://drive.google.com/file/d/1h3GiKflKZGyL7ZC2jp6k8Xo43bOtF6ee/view?usp=sharing",
            isPrimary: false,
        },
    ],
}

export const about = {
    title: "Who I am",
    description: [
        "Graduating with a Bachelor of Science in Electrical Engineering from the University of Stuttgart, " +
        "I am now concluding my Master's studies at TU Berlin. My professional journey in machine learning began as a freelancer with Trumetrics, " +
        "a logistics startup applying state-of-the-art machine learning solutions to transform the industry. " +
        "My prior experience includes a role at IAV GmbH, a leader in automotive software solutions, where I developed both technical and soft skills. \n\n" +

        "My Master's journey has been enriched with various projects, notably the development of an open-source toolbox for neuroscience applications. " +
        "I specialize in designing and implementing automated ML pipelines, adhering to MLOps standards, to streamline the deployment of ML solutions. " +
        "This ensures easy access to advanced ML technologies. " +
        "Continuously learning and staying engaged with professional communities keeps me at the forefront of the field. \n\n" +

        "Recently, I've grown fascinated by the potential of Large Language Models (LLMs) like GPT-4. " +
        "I am particularly interested in harnessing these advanced AI models to build intelligent and interactive chatbots. " +
        "These chatbots can revolutionize the way we interact with technology, providing seamless and natural user experiences. " +
        "I am committed to staying at the forefront of this rapidly evolving field, continually updating my skills and knowledge to keep pace with the latest breakthroughs in AI and machine learning. \n\n" +

        "Outside work, I am passionate about DIY projects, including building FPV race drones and autonomous robocars, and I rejuvenate through jogging and hiking in nature."
    ],
}



export const work = {
    title: "What I do",
    cards: [
        {
            title: "Machine Learning Engineer",
            description: "",
            icons: null,
        }
    ],
}
export const projects = {
    title: "Projects",
    cards: [
        {
            title: "AutoML_BCI",
            description: "An AutoML pipeline for Brain Computer Interface (BCI) application\n" +
                "\n.",
            icons: [
                {
                    icon: faGithub,
                    link: "https://github.com/mralioo/AutoML_BCI",
                },
            ]
        },
        {
            title: "GnuGym",
            description: "A generic tool-kit to use GNU-Radio as OpenAI Gym environment for reinforcement learning .",
            icons: [
                {
                    icon: faGithub,
                    link: "https://github.com/mralioo/GnuGym",
                },
            ]
        },
        {
            title: "Bearing_DNN",
            description: "A ML framework for anomaly classification of faulty bearing using deep neural network.",
            icons: [
                {
                    icon: faGithub,
                    link: "https://github.com/mralioo/Bearing_DNN",
                },
            ]
        },
    ],
}

export const skills = {
    title: "Skills",
    cards: [
        {
            title: "Python",
            description: "Expertise in OOP, data structures, file handling, and concurrency, with a strong foundation in Python's advanced features."
        },
        {
            title: "MLOps",
            description: "Proficient with MLOps tools like Tensorboard, MLFlow, BentoML, DVC for efficient ML model development and deployment."
        },
        {
            title: "AWS",
            description: "Experienced in using AWS services including SageMaker for machine learning, AWS Lambda for serverless applications, and various AWS storage solutions."
        },
        {
            title: "Machine Learning & Deep Learning",
            description: "Skilled in ML/DL frameworks such as Scikit-learn, TensorFlow, and Pytorch for building and optimizing models."
        },
        {
            title: "Data Engineering",
            description: "Competent in ETL processes, SQL database management, data visualization with Bokeh, and REST API integration for data handling."
        },
    ],
}


export const hobbys= {
    title: "hobbies",
    cards: [
        {
            title: "FPV Drone Racing",
            description: "Passionate about building and piloting drones. I construct drones from scratch and experience the thrill of flight through FPV (First Person View) technology. This hobby combines my love for DIY projects with advanced technology, offering both a creative outlet and a technical challenge."
        },
        {
            title: "Autonomous RoboCars",
            description: "I engage in building and programming small-scale RC cars equipped with self-driving capabilities. Participating in local competitions like DEEP BERLIN Robocars, I get to test and refine these autonomous vehicles, putting my robotics skills to the test in a dynamic and competitive environment."
        },
    ],
}



export const contact = {
    title: "Get in touch",
    description: "Coffee Chat! Please do not hesitate to schedule a meeting. Alternatively, feel free to reach out directly by email at mr.ali.alouane@gmail.com",
    buttons: [
        {
            title: "Email Me",
            link: "mailto:mr.ali.alouane@gmail.com",
            isPrimary: true,
        },
        {
            title: "Schedule Meeting",
            link: "https://calendly.com/mr_ali-alouane",
            isPrimary: true,
        },
    ]
}

// SEARCH ENGINE 
export const SEO = {
    // 50 - 60 char
    title: "Ali Alouane | Machine Learning Engineer | MLOps | AWS practitioner",
    description: "I build and deploy ML pipeline. Robotics enthusiast."
}

export const links = {
    image: profile.src,
    title: "@ali_alouane",
    description: "Machine Learning Engineer | MLOps | AWS practitioner ",
    cards: [
        {
            title: "My website",
            link: "https://mralioo.github.io/",
        },
        {
            title: "My GitHub",
            link: "https://github.com/mralioo",
        },
        {
            title: "My LinkedIn",
            link: "https://www.linkedin.com/in/ali-alouane/",
        },
    ]
}