import base64
from io import BytesIO

import streamlit as st
from PIL import Image

from constant import *
from st_functions import st_button, load_css
import streamlit.components.v1 as components


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

st_button('linkedin', 'https://www.linkedin.com/in/ali-alouane/', 'Follow me on LinkedIn', icon_size)
st_button('github', 'https://github.com/mralioo', 'Follow me on GitHub', icon_size)

# -----------------  contact  ----------------- #

st.subheader("📨 Contact Me")

# Create a "Contact Me" button that opens the user's email client
email_address = "mr.ali.alouane@gmail.com"  # Replace with your email address
email_subject = "Let's Connect!"  # You can pre-fill a subject for the email
email_body = "Hi Ali, I'd like to connect with you about..."  # Pre-fill the body text

# contact_form = f"""
# <form action="https://formsubmit.co/{info["Email"]}" method="POST">
#     <input type="hidden" name="_captcha value="false">
#     <input type="text" name="name" placeholder="Your name" required>
#     <input type="email" name="email" placeholder="Your email" required>
#     <textarea name="message" placeholder="Your message here" required></textarea>
#     <button type="submit">Send</button>
# </form>
# """
# st.markdown(contact_form, unsafe_allow_html=True)
# Email button
# Funny introduction and call to action
st.markdown("""
Looking for a tech wizard who also happens to be a coffee aficionado? ☕🧙‍♂️ Look no further! Whether you want to chat about the latest in machine learning, exchange dad jokes, or simply argue about the best coffee beans, I'm your guy. 

Why send a boring old email when you can hit the button below and make my inbox a happier place? 💌 """)


col1, col2, col3 = st.columns(3)
# Using st.markdown to create a mailto link for the "Contact Me" button
col2.markdown(f"""
<a href="mailto:{email_address}?subject={email_subject}&body={email_body}" target="_blank">
    <button style='margin: 10px; padding: 10px; background-color: #4CAF50; color: white; border: none; cursor: pointer;'>
        📧 Send a Direct Email
    </button>
</a>
""", unsafe_allow_html=True)

st.markdown("""
Or, if you're feeling adventurous, let's schedule a coffee chat that could potentially change the course of human history (or just be a really good time). 🎉
""")

# Calendly inline widget HTML code
calendly_html = """
<!-- Calendly inline widget begin -->
<div class="calendly-inline-widget" data-url="https://calendly.com/ali-alouane/30min" style="min-width:320px;height:700px;"></div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
<!-- Calendly inline widget end -->
"""

# Use Streamlit components to render the Calendly widget HTML
components.html(calendly_html, height=700)