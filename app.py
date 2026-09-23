from flask import Flask, render_template

app = Flask(__name__)

PRODUCTS = [
    {
        "id": "chaulafan",
        "name": "Chaulafán especial",
        "description": "Arroz chaufa preparado al momento con la sazón de Chifa Angelito.",
        "image": "🍚",
        "variants": [
            {"name": "Pequeño", "price": 2.00},
            {"name": "Mediano", "price": 3.00},
            {"name": "Grande", "price": 4.00},
        ],
    },
    {
        "id": "tallarin",
        "name": "Tallarín",
        "description": "Tallarín salteado al momento, con nuestra sazón especial.",
        "image": "🍜",
        "variants": [
            {"name": "Pequeño", "price": 4.50},
            {"name": "Grande", "price": 6.00},
        ],
    },
    {
        "id": "tallarin-mixto",
        "name": "Tallarín mixto",
        "description": "Una combinación especial preparada al momento para disfrutar en familia.",
        "image": "🥢",
        "variants": [
            {"name": "Pequeño", "price": 4.50},
            {"name": "Grande", "price": 6.00},
        ],
    },
]

@app.route("/")
def index():
    return render_template("index.html", products=PRODUCTS)

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
