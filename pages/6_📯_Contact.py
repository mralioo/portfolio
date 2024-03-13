import base64
from io import BytesIO

import streamlit as st
from PIL import Image

from constant import *
from st_functions import st_button, load_css


def image_to_base64(image):
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    return img_str


st.set_page_config(layout="centered", initial_sidebar_state='auto')

load_css()

col1, col2, col3 = st.columns(3)
col2.image(Image.open('images/profile.jpg'))

# Display the image in the middle column with circular styling
# with col2:
#     image = Image.open('images/profile.jpg')
#     st.markdown(f"<img class='circle-img' src='data:image/jpeg;base64,{image_to_base64(image)}'>", unsafe_allow_html=True)

st.header('Ali Alouane')

st.info(
    """3+ years of professional experience in machine learning and software development. I am deeply passionate about artificial intelligence and robotics, constantly seeking new challenges and innovations in these fields.""")

icon_size = 20

st_button('linkedin', 'https://github.com/mralioo', 'Follow me on LinkedIn', icon_size)
st_button('github', 'https://github.com/mralioo', 'Follow me on GitHub', icon_size)

# -----------------  contact  ----------------- #
col1, col2 = st.columns(2)
with col1:
    st.subheader("📨 Contact Me")
    contact_form = f"""
    <form action="https://formsubmit.co/{info["Email"]}" method="POST">
        <input type="hidden" name="_captcha value="false">
        <input type="text" name="name" placeholder="Your name" required>
        <input type="email" name="email" placeholder="Your email" required>
        <textarea name="message" placeholder="Your message here" required></textarea>
        <button type="submit">Send</button>
    </form>
    """
    st.markdown(contact_form, unsafe_allow_html=True)
