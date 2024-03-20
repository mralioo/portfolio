import streamlit as st
from st_functions import *

st.set_page_config(layout="wide", initial_sidebar_state='expanded')

st.title("📰 Blogs")


# Function to load and display a post
def display_post(title):
    post = blog_posts.get(title)
    if post:
        # Functional button at the top with default Streamlit styling
        if st.button("Back to All Posts", key="top"):
            st.session_state.selected_post_title = None
            st.experimental_rerun()

        st.title(title)
        with open(post["content"], "r", encoding="utf-8") as file:
            markdown_content = file.read()
        st.markdown(markdown_content, unsafe_allow_html=True)

        # Another functional button at the bottom
        if st.button("Back to All Posts", key="bottom"):
            st.session_state.selected_post_title = None
            st.experimental_rerun()
    else:
        st.error("Post not found.")


def display_welcome_page():
    # Welcome message

    welcome_message = """
    ### Welcome to the Nexus of AI, Robotics, and Software Development 🚀

    Greetings, tech aficionados! 👋 Dive into a realm where artificial intelligence meets real-world applications, robots may (or may not) dream of electric sheep, and software development is both an art and a science. 🧠💻

    I'm thrilled to guide you through a curated collection of insights and reflections gathered on my journey through the fascinating landscapes of AI, robotics, and coding. Here, you'll find a blend of cutting-edge research, practical tips, and, occasionally, tales of code gone rogue. 🌌

    Our mission? To explore the vast frontiers of technology, armed with a keyboard and an insatiable curiosity. Whether you're seeking to unlock the secrets of neural networks, navigate the intricacies of robotic automation, or simply find a more elegant solution to your coding conundrums, you've come to the right place.

    So, pour yourself a cup of your preferred code-fueling beverage ☕ and settle in for a voyage of discovery. Together, we'll demystify the complex, celebrate the breakthroughs, and, perhaps, share a light-hearted moment or two about the quirks of being a programmer. Because, after all, a well-timed loop joke can be just as enlightening as a deep dive into algorithms. 🔄😉

    Embark on this journey with me, and let's transform curiosity into knowledge, one post at a time. Welcome to our community of thinkers, makers, and occasional debuggers. Let's make magic happen with code! ✨
    """

    # Display the welcome message
    st.markdown(welcome_message)

    add_space(2)  # Add space before the next entry

    # Display blog post summaries inside styled rectangles
    for title, post in blog_posts.items():
        with st.container():
            col1, col2 = st.columns([1, 4])
            with col1:
                st.image(post["welcome_image"], width=280)
            with col2:
                # Custom HTML for the blog post container
                blog_post_html = f"""
                <div class="blog-post-container">
                    <h4>{title}</h4>
                    <p>{post["summary"]}</p>
                </div>
                """

                # Display the custom HTML with the blog post content
                st.markdown(blog_post_html, unsafe_allow_html=True)
                # Button to read more
                if st.button("Read More", key=title):
                    st.session_state.selected_post_title = title
                    st.experimental_rerun()


# Example blog posts
blog_posts = {
    "Brain-to-text communication via handwriting": {"summary": """This blog post explores the cutting-edge advancements in neural decoding techniques, 
                                                                particularly focusing on their application in restoring communication and motor functions
                                                                for individuals with severe neurological impairments.""",
                                                    "welcome_image": "images/bcx_intro_image.png",  # Optional: Post image
                                                    "content": "blogs/1_brain_text_cx.md"},
    # "Brain-Computer Interface": {"summary": "Summary of post 2",
    #                                 "welcome_image": "images/Llama_2.png",  # Optional: Post image
    #                              "content": "blogs/2_smr_bci.md"}
}


# Define custom CSS for the blog post summaries with a unique class
custom_css = """
<style>
div.blog-post-container {
    background-color: rgba(220, 220, 220, 0.5); /* Light gray background with adjusted opacity */
    border-radius: 10px; /* Rounded corners */
    padding: 10px; /* Padding inside the rectangle */
    margin-bottom: 20px; /* Margin between rectangles */
}
</style>
"""

st.markdown(custom_css, unsafe_allow_html=True)


if "selected_post_title" not in st.session_state:
    st.session_state.selected_post_title = None

if st.session_state.selected_post_title:
    display_post(st.session_state.selected_post_title)
else:
    display_welcome_page()
