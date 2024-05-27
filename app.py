from flask import Flask, jsonify, send_from_directory
import random
import json
import os

# Path to the scores file within the mounted volume
scores_file = '/data/scores.json' 

app = Flask(__name__)

# Word pool for the game
words = ['house', 'car', 'book', 'computer', 'phone', 'table', 'chair', 'lamp', 'desk', 'bed', 'door', 'window', 'mirror', 'clock', 'television', 'radio', 'guitar', 'piano', 'drums', 'microwave', 'refrigerator', 'oven', 'sink', 'toilet', 'shower', 'bathtub', 'towel', 'soap', 'shampoo', 'toothbrush', 'toothpaste', 'hairbrush', 'comb', 'hairdryer', 'cosmetics', 'perfume', 'deodorant', 'toilet paper', 'tissue', 'trash', 'dustbin', 'broom', 'mop', 'vacuum', 'bucket', 'sponge', 'dish', 'plate', 'bowl', 'fork', 'knife', 'spoon', 'glass', 'cup', 'mug', 'jug', 'bottle', 'can', 'pan', 'pot', 'kettle', 'cutting board', 'oven mitts', 'apron', 'dishwasher', 'mixer', 'blender', 'whisk', 'ovenware', 'cooking', 'utensils', 'scale', 'measuring', 'cup', 'rolling pin', 'food', 'processor', 'coffee', 'maker', 'coffee', 'grinder', 'toaster', 'bread', 'maker', 'juicer', 'tupperware', 'storage', 'container', 'cutlery', 'sharpener', 'ladle', 'strainer', 'colander', 'thermometer', 'timer', 'kitchen', 'timer', 'corkscrew', 'bottle', 'opener', 'peeler', 'grater', 'scissors', 'ruler', 'tape', 'glue', 'pencil', 'pen', 'marker', 'highlighter', 'eraser', 'sharpener', 'notebook', 'journal', 'diary', 'folder', 'file', 'stapler', 'staples', 'hole', 'punch', 'paper', 'clip', 'rubber', 'band', 'envelope', 'calendar', 'planner', 'bulletin', 'board', 'corkboard', 'whiteboard', 'chalkboard', 'eraser', 'clipboard', 'note', 'pad', 'sticky', 'notes', 'post', 'it', 'bookshelf', 'shelf', 'drawer', 'cabinet', 'wardrobe', 'closet', 'hanger', 'hook', 'peg', 'rack', 'clothes', 'hanger', 'clothes', 'peg', 'coat', 'hanger', 'shoe', 'rack', 'umbrella', 'walking', 'stick', 'bag', 'suitcase', 'backpack', 'briefcase', 'wallet', 'purse', 'handbag', 'handkerchief', 'scarf', 'hat', 'cap', 'bonnet', 'gloves', 'mittens', 'socks', 'stockings', 'tights', 'shoes', 'sandals', 'boots', 'sneakers', 'slippers', 'belt', 'tie', 'bow', 'ribbon', 'lanyard', 'necklace', 'bracelet', 'earrings', 'ring', 'watch', 'brooch', 'button', 'zipper', 'lace', 'buckle', 'safety', 'pin', 'sewing', 'needle', 'thread', 'cushion', 'thimble', 'sewing', 'machine', 'scrapbook', 'knitting', 'needles', 'crochet', 'hook', 'yarn', 'wool', 'fabric', 'tapestry', 'patchwork', 'quilting', 'embroidery', 'cross', 'stitch', 'beading', 'pendant', 'hair', 'pin']

@app.route('/', methods=['GET'])
def index():
    return send_from_directory('.', 'index.html')

# Route to handle the start game request
@app.route('/start', methods=['GET'])
def start():
    word = random.choice(words)
    return jsonify({'word': word})

# Serve static files (including JavaScript and CSS)
@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)


# Function to get scores from the file
def get_scores():
    try:
        with open(scores_file, 'r') as f:
            scores = json.load(f)
    except FileNotFoundError:
        scores = {}  # Initialize an empty dictionary if file doesn't exist
    return scores

# Function to save scores to the file
def save_scores(scores):
    with open(scores_file, 'w') as f:
        json.dump(scores, f)

# Route to handle score updates
@app.route('/update_score', methods=['POST'])
def update_score():
    data = request.get_json()  # Get score data from the request
    player_name = data.get('player')
    score = data.get('score')

    scores = get_scores()
    scores[player_name] = score  # Update the score
    save_scores(scores)

    return jsonify({'message': 'Score updated successfully!'}), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5200)
