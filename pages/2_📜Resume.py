import base64
from io import BytesIO
import streamlit as st
from PIL import Image

from constant import *

st.set_page_config(layout="wide", initial_sidebar_state='auto')

def local_css(file_name):
    with open(file_name) as f:
        st.markdown('<style>{}</style>'.format(f.read()), unsafe_allow_html=True)


# Function to display an image by file path
def display_image_with_link(file_path, url, caption='', width=100):
    # Open the image file
    image = Image.open(file_path)

    # Convert the image to base64 for embedding in HTML
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode()

    # Create a custom HTML string with the base64 image and link
    html_str = f"""
    <a href="{url}" target="_blank">
        <img src="data:image/jpeg;base64,{img_str}" width="{width}px" alt="{caption}">
    </a>
    """

    # Display the HTML in Streamlit
    st.markdown(html_str, unsafe_allow_html=True)


local_css("style/style_home.css")
# st.sidebar.markdown(info['Photo'], unsafe_allow_html=True)
st.sidebar.image(Image.open('images/profile.jpg'))

# --- TITLE ---

st.title("📝 Resume")

# Education
st.subheader("Education 🎓")
col1, col2 = st.columns([4, 1])

with col1:
    st.write("""
    **Master of science | Technische Universität Berlin (2018–2024)** \n\n
    **Electrical Engineering** Specialising in communication networks and signal processing. \n\n
    _Master Thesis_: Deep Learning Approaches to Decoding Sensorimotor Rhythms for Accurate Cursor Control in Brain-Computer Interfaces Using a Large-Scale Dataset.
    """)

with col2:
    url = "https://www.tu.berlin/"
    display_image_with_link('images/tu_berlin.jpg', url, width=80)  # Adjust path as needed

col1, col2 = st.columns([4, 1])

with col1:
    st.write("""
    **Bachelor of science | Universität Stuttgart (2013–2017)** \n\n
    **Electrical Engineering** Specialising in communication networks and signal processing. \n\n
    _Bachelor Thesis_: Multidimensional energy disaggregation in residential buildings via deep learning.
    """)

with col2:
    url = "https://www.uni-stuttgart.de/"
    display_image_with_link('images/university_stuttgart_germany.jpg', url, width=80)  # Adjust path as needed

# Work Experience
st.subheader("Work Experience 💼")
col1, col2 = st.columns([4, 1])
with col1:
    st.write("👨‍💻", "**Freelancer, Machine Learning Engineer | truemetrics GmbH**")
    st.write("04/2022 – 10/2023")
    st.write("""
    - ► Collected, labeled, and cleaned datasets for diverse projects.
    - ► Developed and fine-tuned machine learning models for optimized performance.
    - ► Managed AWS ecosystem components.
    """)
with col2:
    url = "https://www.truemetrics.io/"
    display_image_with_link('images/truemetrics.jpeg', url, width=80)  # Adjust path as needed

# Intern, Hardware Developer | Dashfactory GmbH
col1, col2 = st.columns([4, 1])
with col1:
    st.write("👨‍💻", "**Intern, Hardware Developer | Dashfactory GmbH**")
    st.write("03/2021 – 07/2021")
    st.write("""
    - ► Programmed and tested embedded systems using C (RTOS).
    - ► Contributed to the design and specification of system requirements.
    - ► Developed interfaces for various hardware components.
    """)
with col2:
    url = "https://www.dashfactory.de/de/"
    display_image_with_link('images/dashfactory.jpg', url, width=80)  # Adjust path as needed

# Work Student, Transmission & Hybrid Systems Department | IAV GmbH
col1, col2 = st.columns([4, 1])
with col1:
    st.write("👨‍💻", "**Work Student, Transmission & Hybrid Systems Department | IAV GmbH**")
    st.write("09/2018 – 10/2020")
    st.write("""
    - ► Contributed to the development of a Reinforcement Learning framework for automotive applications.
    - ► Automated data preprocessing pipelines for enhanced efficiency.
    - ► Implemented and evaluated various reinforcement and supervised learning algorithms.
    - ► Managed continuous integration and testing utilizing Gitlab CI/CD tools.
    """)
with col2:
    url = "https://www.iav.com/"
    display_image_with_link('images/IAV_Logo.jpg', url, width=80)  # Adjust path as needed

# Intern, Analytics Group | BridgingIT
col1, col2 = st.columns([4, 1])
with col1:
    st.write("👨‍💻", "**Intern, Analytics Group | BridgingIT**")
    st.write("02/2018 – 05/2018")
    st.write("""
    - ► Assessed Microsoft Azure ML cloud services for enterprise applications.
    - ► Trained and evaluated deep learning models using TensorFlow.
    - ► Deployed and managed models both locally and in cloud clusters using Azure’s model management tools.
    """)
with col2:
    url = "https://www.bridging-it.de/"
    display_image_with_link('images/bit-logo.jpg', url, width=80)  # Adjust path as needed

# Work Student, Computational Imaging Group | Sony Deutschland GmbH
col1, col2 = st.columns([4, 1])
with col1:
    st.write("👨‍💻", "**Work Student, Computational Imaging Group | Sony Deutschland GmbH**")
    st.write("05/2017 – 10/2017")
    st.write("""
    - ► Evaluated software for spectral data acquisition and processing.
    - ► Conducted spectral measurements using various acquisition tools.
    - ► Engaged in spectral imaging and data collection for research and development.
    """)
with col2:
    url = "https://www.sony.com/en/SonyInfo/research/about/stuttgart-laboratory1/"
    display_image_with_link('images/sony.jpeg', url, width=80)  # Adjust path as needed

# Download PDF

col1, col2, col3 = st.columns(3)
with col1:
    st.write(
        "[Click here if it's blocked by your browser](https://drive.google.com/file/d/1JABDlAxeHfuSJV0IuyMJKZJ85IH6vJAR/view?usp=drive_link)")

    with open("images/cv_ali_alouane.pdf", "rb") as f:
        base64_pdf = base64.b64encode(f.read()).decode('utf-8')
        pdf_display = F'<iframe src="data:application/pdf;base64,{base64_pdf}" width="1000mm" height="1000" type="application/pdf"></iframe>'
        st.markdown(pdf_display, unsafe_allow_html=True)
