import base64

import pandas as pd
import streamlit as st


def display_devicon(icon_name, icon_color, width="50px"):
    icon_url = f"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{icon_name}/{icon_name}-{icon_color}.svg"
    st.markdown(f"<img src='{icon_url}' style='width: {width};'>", unsafe_allow_html=True)


st.set_page_config(layout="wide")

st.title("📚 Projects")

df = pd.read_csv("projects.csv", sep=";")

content2 = """
🚀 **Welcome to the Launchpad of My Creations!** 🚀

Ahoy, fellow digital voyager! You've just docked at the space station of my imagination, where bits meet wit, and creativity knows no bounds. This portfolio isn't just a collection of projects; it's a mosaic of late-night coding sessions, epiphanies during long walks, and the occasional coffee spill over the keyboard. 🌌☕

🎓 **University Chronicles:** Dive into the depths of my academic endeavors, where each project was not just an assignment, but a quest in the vast universe of knowledge. From the hallowed halls of Technische Universität Berlin to the sleepless nights before deadlines, these projects are the seeds of my passion for technology, nurtured within the greenhouse of academia.

🏆 **Hackathon Adventures:** Fasten your seatbelt as we zoom through the adrenaline-pumped galaxy of hackathons. These projects are the fruits of caffeine-fueled creativity and collaboration, where time was the enemy, and innovation, our sword. Witness the birth of ideas under pressure, where the ticking clock inspired breakthroughs and the camaraderie of fellow hackers forged memories.

💼 **Professional Odyssey:** Journey with me through the landscapes of my professional life, where ideas took flight, and challenges were vanquished. Each project here is a testament to what I've learned on the job, from the art of machine learning to the craft of seamless software deployment. These are not just tasks completed but milestones in my quest for continuous growth and learning.

So, whether you're here to find a kindred spirit, seek inspiration, or just curious to see what a blend of curiosity, hard work, and a touch of madness can create, you're in the right place. Let's explore these digital realms together, and who knows? Maybe we'll discover the next big thing waiting just around the corner of our combined creativity.

Remember, in this digital odyssey, every project is a story, every code snippet a verse, and every debug session a battle won. Let's turn the page to the next chapter of innovation together! ✨🚀
"""

st.subheader(content2)

tab1, tab2, tab3, tab4 = st.tabs(
    ["Brain-Computer Interface 🎓", "Optiiway 🏆", " RL for clutch system💼", "Double Inverted Pendulum 🎓",])
     # "EZCleanData 🏆"])

with tab1:
    st.header("AutoML BCI")
    st.write(
        "AutoML BCI is a framework to train neural network dedicated for Brain-Computer Interface Problem. it supports hyperparameters tunning using Optuna framework, and enables live tracking and model monitoring via Tensorbaord.")
    st.image("images/automl_bci.png", width=1000)
    st.write("https://github.com/mralioo/AutoML_BCI")
    st.markdown("👩‍💻 **Technologies:**")
    col1, col2, col3 = st.columns(3)
    with col1:
        display_devicon('python', 'original', '60px')
        st.caption('Python')
    with col2:
        display_devicon('pytorch', 'original', '60px')
        st.caption('pytorch')

with tab2:
    import streamlit as st

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
        # Assuming you have an icon for Gemini LLM or use a placeholder
        st.markdown("🧠")
        st.caption('Gemini LLM')

    # Link to Pitch PDF
    # st.markdown("📄 Check out our pitch presentation for a deeper dive into Optiway:")

    # with open("images/Optiiway_FinalPresentation.pdf", "rb") as f:
    #     base64_pdf = base64.b64encode(f.read()).decode('utf-8')
    #     pdf_display = F'<iframe src="data:application/pdf;base64,{base64_pdf}" width="1000mm" height="1000" type="application/pdf"></iframe>'
    #     st.markdown(pdf_display, unsafe_allow_html=True)

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

# with tab5:
#     st.header("")
#     st.write(df["description"][4])
#     st.image("images/5.png", width=500)
#     st.write(f"[Source Code]({df['url'][4]})")
#     st.markdown("👩‍💻 **Technologies:**")
#     col1, col2, col3 = st.columns(3)
#     with col1:
#         display_devicon('python', 'original', '60px')
#         st.caption('Python')
#     with col2:
#         display_devicon('cplusplus', 'original', '60px')
#         st.caption('CPP')
#     with col3:
#         display_devicon('streamlit', 'original', '60px')
#         st.caption('streamlit')
