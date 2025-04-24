from bottle import Bottle, run, request, response, template
import requests

app = Bottle()

@app.route('/')
def index():
    return template('index')

@app.post('/chat')
def chat():
    user_input = request.forms.get('user_input')
    endpoint = request.forms.get('endpoint', 'https://api.openai.com/v1/chat/completions')
    api_key = request.forms.get('api_key')

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": user_input}]
    }

    try:
        response = requests.post(endpoint, headers=headers, json=data, stream=True)
        response.raise_for_status()

        def event_stream():
            for line in response.iter_lines(decode_unicode=True):
                if line and line.startswith('data:'):
                    yield f"data: {line[5:]}\n\n"

        return event_stream()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

if __name__ == '__main__':
    run(app, host='localhost', port=8080)