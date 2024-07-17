
import requests
import streamlit.components.v1 as components


from constant import *
from st_functions import *
from st_functions import gradient

st.set_page_config(layout="wide", initial_sidebar_state='expanded')


@st.cache_data
def get_img_as_base64(file):
    with open(file, "rb") as f:
        data = f.read()
    return base64.b64encode(data).decode()

pronoun = info["Pronoun"]
name = info["Name"]


with st.sidebar:
    components.html(embed_component['linkedin'], height=400)


# st.sidebar.image(Image.open('images/profile.jpg'))

def load_lottieurl(url: str):
    r = requests.get(url)
    if r.status_code != 200:
        return None
    return r.json()


def display_devicon(icon_name, icon_color, width="50px"):
    icon_url = f"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{icon_name}/{icon_name}-{icon_color}.svg"
    st.markdown(f"<img src='{icon_url}' style='width: {width};'>", unsafe_allow_html=True)


# Call the function at the start of your app to apply the styles
# local_css("style/style_home.css")
apply_custom_css_with_background('images/niklas-schoenberger-FkWJT0XiX2Y-unsplash.jpg', 'style/style_home.css')
# ----------------- info ----------------- #
full_name = info['Full_Name']
with st.container():
    gradient('#0077B6', '#00B4D8', '#FFFFFF', f"Hi, I'm {full_name}👋", info["Intro"])
    # Add some space after the gradient header
    st.write('<br><br>', unsafe_allow_html=True)

# ----------------- about ----------------- #
st.write(description['About'])

# ----------------- skillset ----------------- #
with st.container():
    st.subheader('⚒️ Technical Skills')
    # Programming Skills
    st.markdown("👩‍💻 **Programming:**")
    col1, col2 = st.columns(2)
    with col1:
        display_devicon('python', 'original', '60px')
        st.caption('Python')
    with col2:
        display_devicon('cplusplus', 'original', '60px')
        st.caption('CPP')

    # Data Visualization Skills
    st.markdown("📊 **Data Visualization:**")
    col1, col2, col3 = st.columns(3)
    with col1:
        display_devicon('plotly', 'original', '60px')
        st.caption('plotly')
    with col2:
        display_devicon('grafana', 'original', '60px')
        st.markdown("grafana")
    with col3:
        display_devicon('streamlit', 'original', '60px')
        st.caption('streamlit')

    # ML / AI Skills
    st.markdown("🧠 **ML / AI:**")
    col1, col2, col3 = st.columns(3)
    with col1:
        display_devicon('pytorch', 'original', '60px')
        st.caption('PyTorch')
    with col2:
        display_devicon('tensorflow', 'original', '60px')
        st.caption('TensorFlow')
    with col3:
        display_devicon('scikitlearn', 'original', '60px')
        st.caption('Scikit-learn')

    # Databases Skills
    st.markdown("🗄️ **Databases:**")
    col1, col2 = st.columns(2)
    with col1:
        display_devicon('postgresql', 'original', '80px')
        st.caption('postgresql')
    with col2:
        display_devicon('mysql', 'original', '60px')
        st.markdown("mysql")

    # Cloud Services Skills
    st.markdown("☁️ **Cloud Services:**")
    col1, col2 = st.columns(2)
    with col1:
        # display_devicon('amazonwebservices', 'original', '60px')
        icon_url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
        st.markdown(f"<img src='{icon_url}' style='width: {'40px'};'>", unsafe_allow_html=True)
        st.caption('AWS')
    with col2:
        display_devicon('googlecloud', 'original', '60px')
        st.markdown("Google Cloud")



# -----------------  footer  ----------------- #
# loading assets
# lottie_gif = load_lottieurl("https://lottie.host/37c60167-ebe6-4b9c-af2d-a86ecd0cf363/LsxpluDtba.json")
# st_lottie(lottie_gif, height=280, key="data")
