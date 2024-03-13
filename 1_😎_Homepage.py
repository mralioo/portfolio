import openai
import requests
import streamlit as st
from llama_index.core import GPTVectorStoreIndex, SimpleDirectoryReader, ServiceContext
from llama_index.llms.openai import OpenAI
from streamlit_lottie import st_lottie

from constant import *

# Alternatively, directly embed CSS as a string
def apply_custom_css():
    st.markdown("""
        <style>
        /* Increase font size for titles and text */
        h1, h2, h3, h4, h5, h6 {
            font-size: 1.5em; /* Adjust the size as needed */
        }

        .stText, .stMarkdown {
            font-size: 1.2em; /* Adjust text size as needed */
        }

        /* Customize specific Streamlit elements by class name */
        .element-container {
            font-size: 1.1em; /* Example: Increase font size for container elements */
        }

        /* Full-width containers */
        .stBlock {
            max-width: 100%;
        }

        </style>
    """, unsafe_allow_html=True)

st.set_page_config(layout="wide", initial_sidebar_state='expanded')

# -----------------  chatbot  ----------------- #
# Set up the OpenAI key
openai_api_key = st.sidebar.text_input('Enter your OpenAI API Key and hit Enter', type="password")
openai.api_key = (openai_api_key)

# load the file
documents = SimpleDirectoryReader(input_files=["bio.txt"]).load_data()

pronoun = info["Pronoun"]
name = info["Name"]


def ask_bot(input_text):
    # define LLM
    llm = OpenAI(
        model_name="gpt-3.5-turbo",
        temperature=0,
        openai_api_key=openai.api_key,
    )
    # llm_predictor = LLMPredictor(llm=llm)
    service_context = ServiceContext.from_defaults(llm_predictor=llm)

    # load index
    index = GPTVectorStoreIndex.from_documents(documents, service_context=service_context)


    # query LlamaIndex and GPT-3.5 for the AI's response
    PROMPT_QUESTION = f"""🤖 Meet Buddy, your AI wingman extraordinaire, here to help {name} navigate the thrilling world of job hunting. With a knack for dishing out relevant and snappy info to recruiters, Buddy's your go-to for all things {name}. But hey, even AI pals hit a snag sometimes. 🤷‍♂️ If Buddy's stumped, he'll gracefully bow out, pointing recruiters directly to {name} for the inside scoop. Remember, Buddy's too cool for "Buddy" labels or unnecessary line breaks in his replies.
    Human: {input}"""

    output = index.as_query_engine().query(PROMPT_QUESTION.format(input=input_text))
    print(f"output: {output}")
    return output.response


# get the user's input by calling the get_text function
def get_text():
    input_text = st.text_input(
        "🤖 Meet MrAliOo, your AI BFF: A blend of genius and goofball, MrAliOo is here to guide you through my world with the wit of Jim Carrey and the smarts of Sherlock Holmes. \n\n"
        "🚀 Ready for a fun chat? Here's how to start:\n\n"
        "🔑 Step 1: Pop your OpenAI API Key into the sidebar. \n\n"
        "🎉 Step 2: Type your question and hit Enter. Let the adventures with MrAliOo begin! ✨",
        key="input")
    return input_text

# -----------------  loading assets  ----------------- #
st.sidebar.markdown(info['Photo'], unsafe_allow_html=True)

def load_lottieurl(url: str):
    r = requests.get(url)
    if r.status_code != 200:
        return None
    return r.json()

def local_css(file_name):
    with open(file_name) as f:
        st.markdown('<style>{}</style>'.format(f.read()), unsafe_allow_html=True)

# local_css("style/style.css")
# Call the function at the start of your app to apply the styles
apply_custom_css()

# loading assets
lottie_gif = load_lottieurl("https://lottie.host/37c60167-ebe6-4b9c-af2d-a86ecd0cf363/LsxpluDtba.json")
python_lottie = load_lottieurl("https://assets6.lottiefiles.com/packages/lf20_2znxgjyt.json")
java_lottie = load_lottieurl("https://assets9.lottiefiles.com/packages/lf20_zh6xtlj9.json")
my_sql_lottie = load_lottieurl("https://assets4.lottiefiles.com/private_files/lf30_w11f2rwn.json")
git_lottie = load_lottieurl("https://assets9.lottiefiles.com/private_files/lf30_03cuemhb.json")
github_lottie = load_lottieurl("https://assets8.lottiefiles.com/packages/lf20_6HFXXE.json")
docker_lottie = load_lottieurl("https://assets4.lottiefiles.com/private_files/lf30_35uv2spq.json")
figma_lottie = load_lottieurl("https://lottie.host/5b6292ef-a82f-4367-a66a-2f130beb5ee8/03Xm3bsVnM.json")
js_lottie = load_lottieurl("https://lottie.host/fc1ad1cd-012a-4da2-8a11-0f00da670fb9/GqPujskDlr.json")

# Load Lottie animations for your skills
pytorch_lottie = load_lottieurl(
    "https://assets9.lottiefiles.com/packages/lf20_m54a654a.json")  # Creative brain animation
tensorflow_lottie = load_lottieurl(
    "https://assets4.lottiefiles.com/private_files/lf30_7s5wz54i.json")  # TensorFlow logo animation
aws_lottie = load_lottieurl(
    "https://lottie.host/6eae8bdc-74d1-4b5d-9eb7-37662274cd19/Nduizk8IOf.json")  # You already had this one
streamlit_lottie = load_lottieurl(
    "https://assets5.lottiefiles.com/packages/lf20_4a15i54u.json")  # Rocket launch animation
scikit_learn_lottie = load_lottieurl(
    "https://assets8.lottiefiles.com/packages/lf20_a054a854.json")  # Data analysis animation
linux_lottie = load_lottieurl("https://assets8.lottiefiles.com/private_files/lf30_45vtmwz5.json")  # Penguin animation


# ----------------- info ----------------- #
def gradient(color1, color2, color3, content1, content2):
    st.markdown(
        f'<h1 style="text-align:center;background-image: linear-gradient(to right,{color1}, {color2});font-size:60px;border-radius:2%;">'
        f'<span style="color:{color3};">{content1}</span><br>'
        f'<span style="color:white;font-size:17px;">{content2}</span></h1>',
        unsafe_allow_html=True)

full_name = info['Full_Name']
with st.container():
    gradient('#0077B6', '#00B4D8', '#FFFFFF', f"Hi, I'm {full_name}👋", info["Intro"])
    # Add some space after the gradient header
    st.write('<br><br>', unsafe_allow_html=True)

with st.container():
    col1, col2 = st.columns([9, 3])

with col1:
    st.write(info['About'])

with col2:
    st_lottie(lottie_gif, height=280, key="data")

# ----------------- skillset ----------------- #
with st.container():
    st.subheader('⚒️ Skills')
    col1, col2, col3, col4 = st.columns([1, 1, 1, 1])

    # Replace placeholders with Lottie animations for your specific skills
    with col1:
        st_lottie(python_lottie, height=70, width=70, key="python", speed=2.5)  # Replace with relevant animation

    # Add Lottie animations for additional skills
    with col2:
        st_lottie(tensorflow_lottie, height=70, width=70, key="tensorflow", speed=2.5)  # TensorFlow

    with col3:
        st_lottie(my_sql_lottie, height=70, width=70, key="mysql", speed=2.5)

    with col4:
        st_lottie(aws_lottie, height=70, width=70, key="aws", speed=2.5)  # AWS

    # Continue adding columns and Lottie animations for more skills
    with col1:
        st_lottie(streamlit_lottie, height=50, width=50, key="streamlit", speed=2.5)  # Streamlit

    with col2:
        st_lottie(scikit_learn_lottie, height=70, width=70, key="scikit-learn", speed=2.5)  # scikit-learn

    with col3:
        st_lottie(linux_lottie, height=70, width=70, key="linux", speed=2.5)  # Linux

    # Add additional columns and animations as needed


st.subheader('🤖 Chat With Me Now')
user_input = get_text()

if user_input:
    # text = st.text_area('Enter your questions')
    if not openai_api_key.startswith('sk-'):
        st.warning('⚠️Please enter your OpenAI API key on the sidebar.', icon='⚠')
    if openai_api_key.startswith('sk-'):
        st.info(ask_bot(user_input))