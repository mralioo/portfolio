import openai
import base64
import requests
import streamlit as st
import streamlit.components.v1 as components
from llama_index.core import GPTVectorStoreIndex, SimpleDirectoryReader, ServiceContext
from llama_index.llms.openai import OpenAI
from streamlit_lottie import st_lottie
from PIL import Image

from constant import *

st.set_page_config(layout="wide", initial_sidebar_state='expanded')

@st.cache_data
def get_img_as_base64(file):
    with open(file, "rb") as f:
        data = f.read()
    return base64.b64encode(data).decode()

# -----------------  background image  ----------------- #
bg_img_main = get_img_as_base64("images/photo-1501426026826-31c667bdf23d.jpg")
bg_img_side = get_img_as_base64("images/henry-co--odUkx8C2gg-unsplash.jpg")

# bg_img_side = "henry-co--odUkx8C2gg-unsplash.jpg"
# bg_img_main_url = "https://unsplash.com/photos/a-person-walking-on-a-beach-with-a-surfboard-Y4cgODfdGlM"

# page_bg_img = f"""
# <style>
# [data-testid="stAppViewContainer"] > .main {{
# background-image: url("data:image/png;base64,{bg_img_main}");
# background-size: 180%;
# background-position: top left;
# background-repeat: no-repeat;
# background-attachment: local;
# }}
#
# [data-testid=stSidebar] {{
#   background-image: linear-gradient(#ff7e5f, #feb47b); /* Watermelon to Peach */
#   font-weight: bold;
#   font-size: 22px; /* Adjust the size as needed */
#
# /* Style hyperlinks */
# a {{
#   display: run-in;
#   font-weight: bold;
#   font-size: 16px; /* Adjust the size as needed */
# }}
#
# p {{
#   color: #073b4c; /* Dark Slate */
# }}
#
# .st-ck {{
#   caret-color: #073b4c; /* Dark Slate */
# }}
#
# .st-bh, .st-c2, .st-c3, .st-c4, .st-c5, .st-c6, .st-c7, .st-c8, .st-c9, .st-ca, .st-cb, .st-b8, .st-cc, .st-cd, .st-ce, .st-cf, .st-cg, .st-ch, .st-ci, .st-cj, .st-ae, .st-af, .st-ag, .st-ck, .st-ai, .st-aj, .st-c1, .st-cl, .st-cm, .st-cn {{
#   color: #073b4c; /* Dark Slate */
# }}
#
#
# }}
#
# [data-testid="stHeader"] {{
# background: rgba(0,0,0,0);
# }}
#
# [data-testid="stToolbar"] {{
# right: 2rem;
# font-weight: bold;
# }}
#
# </style>
# """
#
# # Inject the CSS with st.markdown
# st.markdown(page_bg_img, unsafe_allow_html=True)

# -----------------  custom CSS  ----------------- #
# Alternatively, directly embed CSS as a string
# def apply_custom_css():
#     st.markdown("""
#         <style>
#         /* Increase font size for titles and text */
#         h1, h2, h3, h4, h5, h6 {
#             font-size: 1.4em; /* Adjust the size as needed */
#         }
#
#         .stText, .stMarkdown {
#             font-size: 1.3em; /* Adjust text size as needed */
#         }
#
#         /* Customize specific Streamlit elements by class name */
#         .element-container {
#             font-size: 1.2em; /* Example: Increase font size for container elements */
#         }
#
#         /* Full-width containers */
#         .stBlock {
#             max-width: 100%;
#         }
#
#         </style>
#     """, unsafe_allow_html=True)

# -----------------  chatbot  ----------------- #
# Set up the OpenAI key
openai_api_key = st.sidebar.text_input('Enter your OpenAI API Key and hit Enter', type="password")
openai.api_key = (openai_api_key)

# load the file
documents = SimpleDirectoryReader(input_files=["bio.txt"]).load_data()

pronoun = info["Pronoun"]
name = info["Name"]

def gradient(color1, color2, color3, content1, content2):
    st.markdown(
        f'<h1 style="text-align:center;background-image: linear-gradient(to right,{color1}, {color2});font-size:60px;border-radius:2%;">'
        f'<span style="color:{color3};">{content1}</span><br>'
        f'<span style="color:white;font-size:17px;">{content2}</span></h1>',
        unsafe_allow_html=True)

def ask_bot(input_text):
    # define LLM
    llm = OpenAI(
        model_name="gpt-3.5-turbo",
        temperature=0,
        openai_api_key=openai.api_key,
    )
    # llm_predictor = LLMPredictor(llm=llm)
    service_context = ServiceContext.from_defaults(llm=llm)

    # load index
    index = GPTVectorStoreIndex.from_documents(documents, service_context=service_context)


    # query LlamaIndex and GPT-3.5 for the AI's response
    PROMPT_QUESTION = f"""🤖 Meet Buddy, your AI wingman extraordinaire, here to help {name} navigate the thrilling world of job hunting. With a knack for dishing out relevant and snappy info to recruiters, Buddy's your go-to for all things {name}. But hey, even AI pals hit a snag sometimes. 🤷‍♂️ If Buddy's stumped, he'll gracefully bow out, pointing recruiters directly to {name} for the inside scoop. Remember, Buddy's too cool for "Buddy" labels or unnecessary line breaks in his replies.
    Human: {input}"""

    output = index.as_query_engine().query(PROMPT_QUESTION.format(input=input_text))
    print(f"output: {output}")
    return output.response




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

def local_css(file_name):
    with open(file_name) as f:
        st.markdown('<style>{}</style>'.format(f.read()), unsafe_allow_html=True)


# Call the function at the start of your app to apply the styles
local_css("style/style_home.css")
# apply_custom_css()

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
    st.subheader('⚒️ Skills')
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
    st.markdown("🤖 **ML / AI:**")
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


# -----------------  Chat with MrAliOo  ----------------- #
st.subheader('🤖 Chat With Me Now')

# get the user's input by calling the get_text function
def get_text():
    input_text = st.text_input(
        "🤖 Meet MrAliOo, your AI BFF: A blend of genius and goofball, MrAliOo is here to guide you through my world with the wit of Jim Carrey and the smarts of Sherlock Holmes. \n\n"
        "🚀 Ready for a fun chat? Here's how to start:\n\n"
        "🔑 Step 1: Pop your OpenAI API Key into the sidebar. \n\n"
        "🎉 Step 2: Type your question and hit Enter. \n\n"
        "✨ Let the adventures with MrAliOo begin! ✨",
        key="input")
    return input_text

user_input = get_text()

if user_input:
    # text = st.text_area('Enter your questions')
    if not openai_api_key.startswith('sk-'):
        st.warning('⚠️Please enter your OpenAI API key on the sidebar.', icon='⚠')
    if openai_api_key.startswith('sk-'):
        st.info(ask_bot(user_input))

# -----------------  footer  ----------------- #
# loading assets
# lottie_gif = load_lottieurl("https://lottie.host/37c60167-ebe6-4b9c-af2d-a86ecd0cf363/LsxpluDtba.json")
# st_lottie(lottie_gif, height=280, key="data")