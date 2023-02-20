
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
			link: "https://drive.google.com/file/d/1Hz5vir52HmIEfhlJ3WMC1_Gdg2bV-fGf/view?usp=sharing",
			isPrimary: false,
		},
	],
}

export const about = {
	title: "Who I am",
	description: [
		"I received my bachelor of science degree at the University of Stuttgart in electrical engineering, and currently finishing my master's degree at TU Berlin.\n" +
		"I kick-started my professional career as a machine learning engineer working as a freelancer at a startup –Trumetrics. Before that, I gained a lot of experience in both technical and soft skills as a working student at IAV GmbH one of the pioneer companies in the automotive software solution sector. Also, during my master's study, I worked different machine learning projects such developing open-source Toolbox for neuroscience application.\n",
		"My core competence is the design and implementation of an automated ML pipeline according to the MLOps standards, for facilitating the usage and deployment of machine learning solutions, and hence deliver easy access to the state of the art ML algorithms. Therefore, I keep myself up to date by joining communities and learning new skills.",
		"When I’m not programming, I enjoy spending my time rebuilding DIY projects like; FPV race drone, autonmous robocar. To clear my mind, I enjoy jogging and hiking in the wilderness.",

		"I completed my Bachelor of Science degree in Electrical Engineering at the University of Stuttgart, and I am currently finishing my Master's degree at TU Berlin. I began my professional career as a machine learning engineer, working as a freelancer for a startup Trumetrics." +
		"Prior to that, I gained valuable technical and soft skills as a working student at IAV GmbH, a pioneering company in the automotive software solution sector. During my Master's studies, I also worked on various machine learning projects, including developing an open-source toolbox for neuroscience applications."
		"My core expertise lies in designing and implementing automated ML pipelines in accordance with MLOps standards, which facilitate the usage and deployment of machine learning solutions. This ensures easy access to state-of-the-art ML algorithms. I stay up-to-date by participating in communities and continuously learning new skills."
		"When I am not programming, I enjoy spending my time rebuilding DIY projects, such as FPV race drones and autonomous robocars. To clear my mind, I enjoy jogging and hiking in the wilderness."

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
			description: "OOP, data structures, data types, exception handling, file handling, Concurrency"
		},
		{
			title: "MLOps",
			description: "Tensorboard, MLFlow, BentoML, DVC"
		},
		{
			title: "AWS",
			description: "SageMaker, AWS serverless, AWS storage"
		},
		{
			title: "ML/DL frameworks",
			description: "Scikit-learn, Tensorflow, Pytorch"
		},
		{
			title: "ETL",
			description: "SQL, Bokeh, API"
		},
	],

}

export const hobbys = {
	title: "hobbies",
	cards: [
		{
			title: "FPV-Drone",
			description: "Build a drone from scratch and control it using the First Person View (FPV) perspective. ",
		},
		{
			title: "RoboCar",
			description: "Build a small scale RC car with self driving capability and compete in local races (DEEP BERLIN Robocars).",
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