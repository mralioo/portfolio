import streamlit as st
from PIL import Image
from constant import *

def local_css(file_name):
    with open(file_name) as f:
        st.markdown('<style>{}</style>'.format(f.read()), unsafe_allow_html=True)


st.set_page_config(layout="wide", initial_sidebar_state='auto')
st.title("🛠 Hobbies")

st.markdown("""
## This page is under construction! 🏗️👷
Hey there! We're working hard to make this page as awesome as possible. 🛠️💥

Stay tuned, and thanks for your patience! You're awesome! 🌟

Remember, good things come to those who wait... or those who come back later. 😉
""")

# Optionally, include an under-construction image
st.image("images/under-construction-1bj.png", width=700)

local_css("style/style_home.css")

st.sidebar.markdown(info['Photo'], unsafe_allow_html=True)

img_1 = Image.open("images/1.jpg")
# img_2 = Image.open("images/2.png")
# img_3 = Image.open("images/3.png")

# col1, col2, col3 = st.columns(3)
#
# with col1:
#     st.image(img_1)

# with col2:
#     st.image(img_2)
#
# with col3:
#     st.image(img_3)