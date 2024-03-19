import streamlit as st
from pathlib import Path
from st_functions import local_css

st.set_page_config(layout="wide", initial_sidebar_state='expanded')

st.title("💼 Blogs")

# Function to load and display a post
def display_post(post_file):
    with open(f"blogs/{post_file}", "r", encoding="utf-8") as file:
        markdown_content = file.read()
    st.markdown(markdown_content, unsafe_allow_html=True)

# Dictionary mapping titles to filenames
blog_posts = {
    " Brain-to-text communication via handwriting": "1_brain_text_cx.md",
    "Brain-Computer Interface": "2_smr_bci.md"
}

# Post selection
selected_post_title = st.selectbox("Select a Blog Post", list(blog_posts.keys()))

# Display the selected post
display_post(blog_posts[selected_post_title])
