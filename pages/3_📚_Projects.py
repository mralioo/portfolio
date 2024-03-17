import pandas as pd
import streamlit as st

from st_functions import local_css


def display_devicon(icon_name, icon_color, width="50px"):
    icon_url = f"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{icon_name}/{icon_name}-{icon_color}.svg"
    st.markdown(f"<img src='{icon_url}' style='width: {width};'>", unsafe_allow_html=True)


st.set_page_config(layout="wide", initial_sidebar_state='expanded')

local_css("style/style_projects.css")

st.title("📚 Projects")

df = pd.read_csv("projects.csv", sep=";")

content2 = """
🚀 **Welcome to the Launchpad of My Creations!** 🚀

Ahoy, fellow digital voyager! You've just docked at the space station of my imagination, where bits meet wit, and creativity knows no bounds. This portfolio isn't just a collection of projects; it's a mosaic of late-night coding sessions, epiphanies during long walks, and the occasional coffee spill over the keyboard. 🌌☕

🎓 **University Chronicles:** Dive into the depths of my academic endeavors, where each project was not just an assignment, but a quest in the vast universe of knowledge. From the hallowed halls of Technische Universität Berlin to the sleepless nights before deadlines, these projects are the seeds of my passion for technology, nurtured within the greenhouse of academia.

🏆 **Hackathon Adventures:** Fasten your seatbelt as we zoom through the adrenaline-pumped galaxy of hackathons. These projects are the fruits of caffeine-fueled creativity and collaboration, where time was the enemy, and innovation, our sword. Witness the birth of ideas under pressure, where the ticking clock inspired breakthroughs and the camaraderie of fellow hackers forged memories.

💼 **Professional Odyssey:** Journey with me through the landscapes of my professional life, where ideas took flight, and challenges were vanquished. Each project here is a testament to what I've learned on the job, from the art of machine learning to the craft of seamless software deployment. These are not just tasks completed but milestones in my quest for continuous growth and learning.

🎨 **Passionate Pursuits:** Explore my journey into new realms of creativity and excitement with hobby and fun projects that unlocked fresh passions. From experimental art installations to whimsical game prototypes, each endeavor in this category is a testament to the joy of exploration and the thrill of discovery. Join me in uncovering the unexpected and embracing the playful side of innovation.

So, whether you're here to find a kindred spirit, seek inspiration, or just curious to see what a blend of curiosity, hard work, and a touch of madness can create, you're in the right place. Let's explore these digital realms together, and who knows? Maybe we'll discover the next big thing waiting just around the corner of our combined creativity.

Remember, in this digital odyssey, every project is a story, every code snippet a verse, and every debug session a battle won. Let's turn the page to the next chapter of innovation together! ✨🚀
"""

st.subheader(content2)

# Custom CSS to increase tab font size
st.markdown("""
<style>
/* Target the tab labels */
.css-1e5imcs {
    font-size: 300px !important;
}
</style>
""", unsafe_allow_html=True)

tab1, tab2, tab3, tab4, tab5, tab6 = st.tabs(
    ["Brain-Computer Interface 🎓",
     "Optiiway 🏆",
     "RL for clutch system💼",
     "Double Inverted Pendulum 🎓",
     "GnuGym 🎓",
     "Better call Saul 🎨"])

with tab1:
    st.header("AutoML BCI")
    st.write(
        "AutoML BCI is a framework to train neural network dedicated for Brain-Computer Interface Problem. it supports hyperparameters tunning using Optuna framework, and enables live tracking and model monitoring via Tensorbaord.")

    description = """
    Motor imagery-based brain-computer interfaces (MI-BCIs) represent a significant
    paradigm within the field of neurotechnology, particularly for individuals with
    paralysis. By mentally rehearsing motor movements, MI-BCIs facilitate control
    over prosthetic limbs or wheelchairs. The construction of a classifier for MI-BCI applications involves complex processing and feature extraction from brain signals
    to distinguish between various mental states. BCI is inherently multidisciplinary,
    demanding expertise not only in neuroscience, machine learning, and electrical
    engineering but also in software development. The complexity of integrating
    these disciplines necessitates a comprehensive toolbox that encompasses standard
    methods and is regularly updated with new datasets and algorithms. Such a toolbox enables scientists and engineers to rapidly prototype and develop algorithms
    efficiently. Given the increasing prominence of deep learning in numerous fields,
    this thesis introduces a deep learning interface incorporated into an existing BCI
    toolbox. This interface streamlines the development and training of neural networks, adhering to a more automated and standardized machine learning lifecycle.
    Utilizing the Sensorimotor Rhythm (SMR) dataset, the largest open BCI dataset
    available, this thesis integrates it into the BBCPy toolbox as a standard resource.
    The dataset is employed as a benchmark for evaluating the performance of deep
    learning models in the Motor imagery BCI classification task.
    """

    st.write(description)

    st.image("images/automl_bci.png", width=1000)
    st.write("[Source Code](https://github.com/mralioo/AutoML_BCI)")

    st.markdown("👩‍💻 **Technologies:**")
    col1, col2, col3 = st.columns(3)
    with col1:
        display_devicon('python', 'original', '60px')
        st.caption('Python')
    with col2:
        display_devicon('pytorch', 'original', '60px')
        st.caption('pytorch')

with tab2:
    # Project Header
    st.header("Optiiway: The LLM Companion for EV Owners 🚗⚡")

    # Project Description
    project_description_bcx24 = """
    During the Bosch ConnectedExperience (BCX), one of Europe's largest AI and IoT hackathons, our multidisciplinary team of talented minds participated in the digital.auto & mobility track. This track challenged participants to create innovative solutions for the automotive sector, focusing on enhancing the driver's experience through personalized welcomes, virtual vehicle applications, controlling off-road vehicles, and more.

    After 30 hours of intense collaboration and creativity, we introduced **Optiway**, a revolutionary LLM companion integrated into electric vehicles (EVs). Optiway is not just a navigation tool; it's a smart assistant that understands personal preferences, such as the desire for a specific type of restaurant. It then finds the optimal restaurant that not only matches the user's taste but also has the closest charging station, ensuring convenience and efficiency for EV owners.

    Our solution represents a step forward in making EV ownership more seamless and personalized, addressing common concerns about charging infrastructure and range anxiety.
    """

    # Display the project description
    st.write(project_description_bcx24)

    # Display the project image
    st.image("images/optiiway.png", width=1000)

    # Technologies Used
    st.markdown("👩‍💻 **Technologies:**")
    col1, col2, col3 = st.columns(3)
    with col1:
        display_devicon('python', 'original', '60px')
        st.caption('Python')
    with col2:
        display_devicon('googlecloud', 'original', '60px')
        st.caption('Google Cloud')

    with col3:
        # Define the SVG code for the Gemini icon
        gemini_icon_svg = """
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 188">
          <!-- SVG path code here -->
        </svg>
        """

        # Display the Gemini icon
        st.markdown(gemini_icon_svg, unsafe_allow_html=True)
        st.caption('Google Gemini')

with tab3:
    st.header("Reinforcement Learning Framework for Automotive Application")
    st.write(
        "I worked for 2 years as a working student helping my supervisor Dr. Alexander Lampe at IAV GmbH to build a Reinforcement learning (RL) framework for transmission control. The RL framework is implemented with PyTorch/Ignite libraries, and adapts the MLOps design pattern to enable Continuous integration and Continuous delivery (CI/CD).")
    st.image("images/iav.png", width=500)
    st.markdown("👩‍💻 **Technologies:**")
    col1, col2, col3 = st.columns(3)
    with col1:
        display_devicon('python', 'original', '60px')
        st.caption('Python')
    with col2:
        display_devicon('pytorch', 'original', '60px')
        st.caption('pytorch')
    with col3:
        display_devicon('matlab', 'original', '60px')
        st.caption('matlab')

with tab4:
    # Header for the project
    st.header("Double Inverted Pendulum Swing-Up and Stabilization using MPC and RL")

    # New project description
    project_description = """
    This project aims to control a double inverted pendulum using model predictive control (MPC). The starting position is set to the origin of coordinates with both pendulums hanging down. The MPC approach shall be able to, within physical limitations, bring cart and pendulums in any arbitrary position while avoiding given obstacles.

    The model of a double pendulum can be used in real-life applications, for example in the field of robotics. Furthermore, it is useful in understanding fundamental principles of pendulum behavior, which itself is a widely used model for a variety of systems.

    For the problem at hand, we will use a direct MPC approach utilizing orthogonal collocation. An essential part of the problem is finding a suitable cost function.

    In addition, a reinforcement learning approach is used, namely soft actor critic (SAC). The results of both methods will be compared.
    """
    # Display the project description
    st.write(project_description)

    # Display an MP4 video instead of an image
    video_file = "images/cart_animation_obstacle_4n.mp4"  # Update the path to your video file

    # Check if the video file is a URL or a local file and display it accordingly
    if video_file.startswith("http"):
        st.video(video_file)
    else:
        video_file = open(video_file, "rb")
        st.video(video_file.read())

    # Link to GitHub repository
    st.write("https://github.com/mralioo/MPC_RL")

    # Display technologies used in the project
    st.markdown("👩‍💻 **Technologies:**")
    col1, col2, col3 = st.columns(3)
    with col1:
        display_devicon('python', 'original', '60px')
        st.caption('Python')
    with col2:
        display_devicon('pytorch', 'original', '60px')
        st.caption('PyTorch')
    with col3:
        st.markdown("🤖")
        st.caption('OpenAI Gym')

with tab5:
    st.header("GNU-Radio as OpenAI Gym Environment")
    st.write("""
    This is a generic tool-kit to use GNU-Radio as OpenAI Gym environment. You can setup your own GNU-Radio scenario and define your ML model in the tool-kit.
    """)
    st.image("images/gnugym.png", width=1000)
    # Extended description
    st.write("""
    —Nowadays Reinforcement Learning (RL) shows promising advancement in fields like image recognition tasks by not relying on closed form solutions and finding solutions by applying e.g. inference techniques. Therefore, an agent tries out different actions on a given environment to find a nearly optimal solution. These approaches are used to solve more and more control problems. They are already used in the communication and networking domain. To evaluate transmission schemes/network stacks an environment to train an agent is necessary. Additionally, researchers are using GNU-Radio as Software Defined Radio (SDR) tool to do rapid and low-cost prototyping for new and existing wireless technologies. In this paper, we introduce gnugym, a framework to use GNU-Radio as OpenAI Gym environment. Thereby, we enable RL for GNU-Radio. gnugym includes a general part, caring about communication and management of GNU-Radio. Via two interfaces, a specific environment is loaded describing the specific Machine Learning (ML) model. This split allows rapid integration of new ML models within the framework. As proof of concept, we use an implementation of the IEEE 802.11p stack and run it in a loopback example. The Modulation and Coding Scheme (MCS) is set for given Received Signal Strength Indication (RSSI) values. During training, the distance between sender and receiver varies. With some Supervised Learning (SL) algorithms, there is successful training.
    """)
    st.write("[Source Code](https://github.com/mralioo/GnuGym)")

    # Display technologies used in the project
    st.markdown("👩‍💻 **Technologies:**")
    col1, col2, col3 = st.columns(3)
    with col1:
        display_devicon('python', 'original', '60px')
        st.caption('Python')
    with col2:
        display_devicon('pytorch', 'original', '60px')
        st.caption('PyTorch')
    with col3:
        st.markdown("🤖")
        st.caption('OpenAI Gym')

with tab6:
    st.header("Better Call Saul Chatbot")
    st.write("""
    Better Call Saul Chatbot is a hobby project aimed at creating a chatbot for legal counsel. It utilizes a combination of techniques including Rasa for chatbot implementation and a Large Language Model (LLM) trained on a corpus of legal documents. The chatbot is accessible through a web interface built with Streamlit.

    Key Features:

    - **Advanced NLP Capabilities:** The chatbot leverages LLM technology to understand legal queries and provide relevant responses.

    - **Personalized Assistance:** It aims to offer personalized legal advice by analyzing user input and adapting its responses accordingly.

    - **Seamless Communication:** Integration with Rasa ensures smooth interaction between users and the chatbot.

    - **User-Friendly Interface:** The web interface, developed with Streamlit, provides an intuitive platform for users to engage with the chatbot.

    - **Continuous Learning:** The chatbot's knowledge base is continuously updated to keep pace with the latest legal developments.

    Better Call Saul Chatbot is a passion project focused on exploring the capabilities of AI in the legal domain. It serves as a platform for experimentation and learning in the fields of NLP and legal technology.
    """)
    st.image("images/rag.png", width=1000)
    st.write("[Source Code](https://github.com/mralioo/better_call_saul_bot)")

    # Display technologies used in the project
    st.markdown("👩‍💻 **Technologies:**")
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        display_devicon('python', 'original', '60px')
        st.caption('Python')
    with col2:
        display_devicon('pytorch', 'original', '60px')
        st.caption('PyTorch')
    with col3:
        st.markdown("""
            <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 48 48">
                <path fill="none" stroke="currentColor" stroke-linejoin="round" d="M18.38 27.94v-14.4l11.19-6.46c6.2-3.58 17.3 5.25 12.64 13.33"/>
                <path fill="none" stroke="currentColor" stroke-linejoin="round" d="m18.38 20.94l12.47-7.2l11.19 6.46c6.2 3.58 4.1 17.61-5.23 17.61"/>
                <path fill="none" stroke="currentColor" stroke-linejoin="round" d="m24.44 17.44l12.47 7.2v12.93c0 7.16-13.2 12.36-17.86 4.28"/>
                <path fill="none" stroke="currentColor" stroke-linejoin="round" d="M30.5 21.2v14.14L19.31 41.8c-6.2 3.58-17.3-5.25-12.64-13.33"/>
                <path fill="none" stroke="currentColor" stroke-linejoin="round" d="m30.5 27.94l-12.47 7.2l-11.19-6.46c-6.21-3.59-4.11-17.61 5.22-17.61"/>
                <path fill="none" stroke="currentColor" stroke-linejoin="round" d="m24.44 31.44l-12.47-7.2V11.31c0-7.16 13.2-12.36 17.86-4.28"/>
            </svg>
            """, unsafe_allow_html=True)
        st.caption('ChatGPT')

    with col4:
        st.markdown(
            "<svg xmlns='http://www.w3.org/2000/svg' width='60px' height='60px' viewBox='0 0 24 24'><path fill='currentColor' d='m20.848 15.852l-3.882-2.034H.97V7.515h22.06v6.303h-2.182zM0 6.545v8.243h16.727l5.091 2.667v-2.667H24V6.545zm1.94 1.94h4.12v2.18l-1.33.517l1.362 1.666H4.84l-1.06-1.296l-.87.339v.957h-.97zM8 12.848h-.97V8.485h4.364v4.363h-.97v-1.454H8zm4.364-1.696V8.485h4.363v.97h-3.394v.727h3.394v2.666h-4.363v-.97h3.394v-.726zm5.333-.243V8.485h4.364v4.363h-.97v-1.454h-2.424v1.454h-.97zm-14.788-.06l2.182-.848v-.546H2.909zM8 9.456v.97h2.424v-.97zm13.09.97v-.97h-2.423v.97h2.424Z'/></svg>",
            unsafe_allow_html=True)
        st.caption('RASA')
