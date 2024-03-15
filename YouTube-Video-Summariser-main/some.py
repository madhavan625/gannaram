from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi

app = Flask(__name__)

def get_transcript(video_url):
    video_id = video_url.split('v=')[1].split('&')[0]
    transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
    return transcript_list


@app.route('/summary', methods=['GET'])
def summary_api():
    url = request.args.get('url', '')
    transcript = get_transcript(url)
    return jsonify(transcript), 200


if __name__ == '__main__':
    app.run(host='127.0.0.1',port=5000)
    