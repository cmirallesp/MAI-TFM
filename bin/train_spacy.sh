#python join_lines.py data/train1.md
#python train.py data/rasa_train1.md ../config/spacy_train1.json
cd nlp_unit
#python train.py data/train1.md config/spacy.json > result
time python train.py data/training_data.json config/spacy.json
