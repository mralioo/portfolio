from st_functions import *

st.set_page_config(layout="wide", initial_sidebar_state='auto')

# local_css("style/style_cv.css")
apply_custom_css_with_background('images/irina-zhuravleva-22OIit878gU-unsplash.jpg', 'style/style_cv.css')

# --- PROFILE IMAGE ---
# Custom CSS to include in your app

image_path = "images/profile.jpg"
base64_image = get_image_as_base64(image_path)

custom_html_1 = f"""
            <style>
                [data-testid="stSidebar"] {{
                    background-image: url(http://placekitten.com/120/120);
                    background-repeat: no-repeat;
                    padding-top: 80px;
                    background-position: 20px 20px;
                }}
            </style>
            """

custom_html = f"""
<style>
.circular-image {{
    position: relative; /* Adjust if needed */
    top: 0; /* Adjust if needed */
    left: 0; /* Adjust if needed */
    width: 350px; /* Adjust based on your image's size */
    height: 350px; /* Adjust based on your image's size */
    border-radius: 50%; /* Create a perfect circle */
    border: 2px solid #ffffff; /* Border color and width */
    z-index: 999; /* Ensure the image is above other elements */
}}
</style>
<img src="data:image/jpeg;base64,{base64_image}" alt="Profile Image" class="circular-image">

"""
# Use st.markdown to render the custom HTML
st.sidebar.markdown(custom_html, unsafe_allow_html=True)
# add_logo("images/profile.jpg",height=250)

# add_space(10)

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
    Master of Science | Technical University of Berlin (2018–2024)
    </div> 

    <div>
    <strong>Electrical Engineering</strong> Specializing in communication networks and signal processing.
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
    Bachelor of science | Universiy of Stuttgart(2013–2017)
    </div> 

    <div>
    <strong>Electrical Engineering</strong> Specializing in communication networks and signal processing.
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
    - ► Investigate and visulaize .
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

col1, col2, col3 = st.columns([4, 1, 1])
with col1:
    with open("images/cv_ali_alouane.pdf", "rb") as f:
        base64_pdf = base64.b64encode(f.read()).decode('utf-8')
        pdf_display = F'<iframe src="data:application/pdf;base64,{base64_pdf}" width="1000mm" height="1000" type="application/pdf"></iframe>'
        st.markdown(pdf_display, unsafe_allow_html=True)

with col3:
    st.write("📥", "Download PDF")
    st.markdown(
        f'<a href="data:application/pdf;base64,{base64_pdf}" download="cv_ali_alouane.pdf">Click here to download</a>',
        unsafe_allow_html=True)
