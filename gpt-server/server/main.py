import json
from flask import Flask, request
from flask_cors import CORS
from openai import OpenAI


app = Flask(__name__)
CORS(app)

client = None
MAX_TOKENS=10



@app.route('/')
def main_page():
    return 'Hello, World!'

@app.route('/api/prompt', methods=['POST'])
def send_prompt():
    prompt = request.get_json()
    messages = [{"role": it['role'], "content": it["message"]} for it in prompt]

    if client:
        chat_completion = client.chat.completions.create(
            model="gpt-3.5-turbo", messages=messages, max_tokens=MAX_TOKENS
        )
        return json.dumps({"status": "success", "answer": chat_completion.choices[0].message.content})

    return json.dumps({"status": "failed"})



if __name__ == '__main__':
    client = OpenAI(
        api_key="sk-FkiIDqOessbUWct0OEsjfVZp5R5gPTRT",
        base_url="https://api.proxyapi.ru/openai/v1"
    )

    app.run(host='0.0.0.0')
