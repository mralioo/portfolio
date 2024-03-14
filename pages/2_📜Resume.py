import base64
from io import BytesIO

import streamlit as st
from PIL import Image

st.set_page_config(layout="wide", initial_sidebar_state='auto')


def local_css(file_name):
    with open(file_name) as f:
        st.markdown('<style>{}</style>'.format(f.read()), unsafe_allow_html=True)


# Helper function to add space
def add_space(amount=1):
    for _ in range(amount):
        st.write("")


def display_icon(icon_path, caption='', width=30):  # Adjust width as needed
    st.image(icon_path, caption=caption, width=width, use_column_width=False)


# Function to display an icon from an external URL
def display_icon_with_url(url, alt_text, width="40px"):  # Adjust width as needed
    # Create an HTML string with the image
    html_str = f'<img src="{url}" alt="{alt_text}" width="{width}" />'
    # Display the HTML in Streamlit
    st.markdown(html_str, unsafe_allow_html=True)


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
# st.sidebar.image(Image.open('images/profile.jpg'))

# --- TITLE ---

st.title("📝 Resume")

# Education
st.subheader("Education 🎓")
col1, col2 = st.columns([4, 1])

with col1:
    st.markdown("""
    <style>
    .big-font {
        font-size:20px !important;
        font-weight: bold;
    }
    </style>

    <div class="big-font">
    Master of Science | Technische Universität Berlin (2018–2024)
    </div> 

    <div>
    <strong>Electrical Engineering</strong> Specialising in communication networks and signal processing.
    </div>

    <div>
    <em>Master Thesis:</em> Deep Learning Approaches to Decoding Sensorimotor Rhythms for Accurate Cursor Control in Brain-Computer Interfaces Using a Large-Scale Dataset.
    </div>
    """, unsafe_allow_html=True)

with col2:
    url = "https://www.tu.berlin/"
    display_image_with_link('images/tu_berlin.jpg', url, width=120)  # Adjust path as needed

add_space(2)  # Add space before the next entry

col1, col2 = st.columns([4, 1])

with col1:
    st.markdown("""
    <style>
    .big-font {
        font-size:20px !important;
        font-weight: bold;
    }
    </style>

    <div class="big-font">
    Bachelor of science | Universität Stuttgart (2013–2017)
    </div> 

    <div>
    <strong>Electrical Engineering</strong> Specialising in communication networks and signal processing.
    </div>

    <div>
    <em>Bachelor Thesis:</em> Multidimensional energy disaggregation in residential buildings via deep learning.
    </div>
    """, unsafe_allow_html=True)

with col2:
    url = "https://www.uni-stuttgart.de/"
    display_image_with_link('images/university_stuttgart_germany.jpg', url, width=120)  # Adjust path as needed

add_space(2)  # Add space before the next entry

# Work Experience
st.subheader("Work Experience 💼")

# Freelancer, Machine Learning Engineer | truemetrics GmbH
col1, col2 = st.columns([4, 1], gap="small")
with col1:
    st.write("👨‍💻", "**Freelancer, Machine Learning Engineer | truemetrics GmbH**")
    st.write("04/2022 – 10/2023")
    st.write("""
    - ► Collected, labeled, and cleaned datasets for diverse projects.
    - ► Developed and fine-tuned machine learning models for optimized performance.
    - ► Managed AWS ecosystem components.
    """)
    # Display used technology icons
    st.markdown("###### Technologies Used:")
    col_tech = st.columns(2)
    with col_tech[0]:
        url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg"
        display_icon_with_url(url, 'TensorFlow', '50px')
        st.caption('TensorFlow')
    with col_tech[1]:
        url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
        display_icon_with_url(url, 'AWS', '50px')
        st.caption('AWS')
with col2:
    url = "https://www.truemetrics.io/"
    display_image_with_link('images/truemetrics.jpeg', url, width=100)  # Adjust path as needed

add_space(2)  # Add space before the next entry

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

    # Display used technology icons
    st.markdown("###### Technologies Used:")
    col_tech = st.columns(3)
    with col_tech[0]:
        url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"
        display_icon_with_url(url, "c", "50px")
        st.caption('c')
    with col_tech[1]:
        url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unifiedmodelinglanguage/unifiedmodelinglanguage-original.svg"
        display_icon_with_url(url, 'uml', '50px')
        st.caption('uml')
    with col_tech[2]:
        url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original-wordmark.svg"
        display_icon_with_url(url, 'arduino', '50px')
        st.caption('Arduino')

with col2:
    url = "https://www.dashfactory.de/de/"
    display_image_with_link('images/dashfactory.jpg', url, width=100)  # Adjust path as needed

add_space(2)  # Add space before the next entry

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

    # Display used technology icons
    st.markdown("###### Technologies Used:")
    col_tech = st.columns(4)
    with col_tech[0]:
        url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg"
        display_icon_with_url(url, 'pytorch', '50px')
        st.caption('pytorch')
    with col_tech[1]:
        url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original-wordmark.svg"
        display_icon_with_url(url, "Jupyter", "50px")
        st.caption('Jupyter')
    with col_tech[2]:
        url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg"
        display_icon_with_url(url, 'jenkins', '50px')
        st.caption('jenkins')
    with col_tech[3]:
        url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg"
        display_icon_with_url(url, "matlab", "50px")
        st.caption('matlab')

with col2:
    url = "https://www.iav.com/"
    display_image_with_link('images/IAV_Logo.jpg', url, width=100)  # Adjust path as needed

add_space(2)  # Add space before the next entry

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

    # Display used technology icons
    st.markdown("###### Technologies Used:")
    col_tech = st.columns(2)
    with col_tech[0]:
        url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg"
        display_icon_with_url(url, "azure", "50px")
        st.caption('azure')
    with col_tech[1]:
        url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg"
        display_icon_with_url(url, 'tensorflow', '50px')
        st.caption('tensorflow')

with col2:
    url = "https://www.bridging-it.de/"
    display_image_with_link('images/bit-logo.jpg', url, width=150)  # Adjust path as needed

add_space(2)  # Add space before the next entry

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
    # Display used technology icons
    st.markdown("###### Technologies Used:")
    col_tech = st.columns(2)
    with col_tech[0]:
        url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg"
        display_icon_with_url(url, "matlab", "50px")
        st.caption('matlab')

    with col_tech[1]:
        url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
        display_icon_with_url(url, 'python', '50px')
        st.caption('python')

with col2:
    url = "https://www.sony.com/en/SonyInfo/research/about/stuttgart-laboratory1/"
    display_image_with_link('images/sony.jpeg', url, width=100)  # Adjust path as needed

# Download PDF

col1, col2, col3 = st.columns(3)
with col1:
    st.write(
        "[Click here if it's blocked by your browser](https://drive.google.com/file/d/1JABDlAxeHfuSJV0IuyMJKZJ85IH6vJAR/view?usp=drive_link)")

    with open("images/cv_ali_alouane.pdf", "rb") as f:
        base64_pdf = base64.b64encode(f.read()).decode('utf-8')
        pdf_display = F'<iframe src="data:application/pdf;base64,{base64_pdf}" width="1000mm" height="1000" type="application/pdf"></iframe>'
        st.markdown(pdf_display, unsafe_allow_html=True)
