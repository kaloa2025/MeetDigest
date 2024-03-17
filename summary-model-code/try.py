import re
import nltk
from collections import Counter
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize

# Download NLTK resources
nltk.download('punkt')
nltk.download('stopwords')

def read_text_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()

def extract_data(text):
    # Define regular expressions for extracting data
    date_regex = r'\b(\d{1,2}(?:st|nd|rd|th)?\s(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?))\b'
    name_regex = r'([A-Za-z\s]+):'
    city_pattern = r'\b(?:mumbai|delhi|bangalore|kolkata|chennai|ahmedabad|hyderabad|pune|surat|jaipur|lucknow|kanpur|nagpur|indore|thane|bhopal|visakhapatnam|pimpri-chinchwad|patna|vadodara|ghaziabad|ludhiana|agra|nashik|faridabad|meerut|rajkot|kalyan-dombivali|vasai-virar|varanasi)\b'
    phone_regex = r'\b\d{10}\b'
    pincode_regex = r'\b\d{6}\b'  # Matches 6-digit PIN codes

    # Extract data using regular expressions
    dates = re.findall(date_regex, text)
    names = set(re.findall(name_regex, text))
    cities = re.findall(city_pattern, text, flags=re.IGNORECASE)
    phones = re.findall(phone_regex, text)
    pincodes = re.findall(pincode_regex, text)

    return dates, names, cities, phones, pincodes

'''
NLTK MODEL CODE
'''

# Cleaning text that is got from meet transcript
def clean(text):
    sample = text.split('**')
    sample.pop(0)
    clean_text = ""
    i = 0
    for t in sample:
        if i % 2 != 0:
            clean_text += str(t)
        i += 1
    return clean_text


# Finding list of stopwords ( Stopwords are 
# those which do not add meaning to sentence)
stop_words = set(stopwords.words("english"))

# Tokenize
def Wtokenize(text):
    words = word_tokenize(text)
    return words


# Frequency table will be storing frequency of each word 
# appearing in input text after removing stop words
# Need: It will be used for finding most relevant sentences
# as we will be applying this dictionary on every sentence 
# and find its importance over other
def gen_freq_table(text):
    freqTable = dict()
    words = Wtokenize(text)
    
    for word in words:
        word = word.lower()
        if word in stop_words:
            continue
        if word in freqTable:
            freqTable[word] += 1
        else:
            freqTable[word] = 1
    return freqTable

# Sentence Tokenize
def Stokenize(text):
    sentences = sent_tokenize(text)
    return sentences

# Storing Sentence Scores
def gen_rank_sentences_table(text):

    # dictionary storing value for each sentence
    sentenceValue = dict()
    
    # Calling function gen_freq_table to get frequency of words
    freqTable = gen_freq_table(text)
    
    # Calling list of sentences after tokenization
    sentences = Stokenize(text)

    for sentence in sentences:
        for word, freq in freqTable.items():
            if word in sentence.lower():
                if sentence in sentenceValue:
                    sentenceValue[sentence] += freq
                else:
                    sentenceValue[sentence] = freq
    return sentenceValue


def summary(text):
    sum = 0
    sentenceValue = gen_rank_sentences_table(text)
    for sentence in sentenceValue:
        sum += sentenceValue[sentence]
    avg = int(sum / len(sentenceValue))
    summary = ""
    sentences = Stokenize(text)
    for sentence in sentences:
        if (sentence in sentenceValue) and (sentenceValue[sentence] > (1.2 * avg)):
            summary += " " + sentence
    return summary


def mainFunc(inp_text, dates, names, cities, phone_number, pincode, output_file):

    # getting text cleaned
    if "**" not in inp_text:
        text = inp_text
    else:
        cleaned_text = clean(inp_text)
        text = cleaned_text
    summary_text = summary(text)

    # Concatenate all names into a single line
    all_names = ", ".join(names)

    # Initialize full_summary
    full_summary = ""

    # Concatenate summary with extracted information
    full_summary += "Meeting Date(s): {}\n".format(", ".join(dates))
    full_summary += "Participants in meeting: {}\n".format(", ".join(name.strip() for name in names))
    
    full_summary += "Cities mentioned in meeting: {}\n".format(", ".join(cities))
    full_summary += "Phone Number mentioned in meeting:: {}\n".format(", ".join(phone_number))
    full_summary += "Pincode(s) mentioned in meeting:: {}\n".format(", ".join(pincode))
    full_summary += "SUMMARY:-\n"+summary_text + "\n\n"

    # Write summary to a new text file
    with open(output_file, 'w') as file:
        file.write(full_summary)


file_path = 'text_file.txt'
output_file = 'summary_output.txt'
text = read_text_file(file_path)
dates, names, cities, phones, pincodes = extract_data(text)

# Generate summary using the NLTK model and save it to a new file
mainFunc(text, dates, names, cities, phones, pincodes, output_file)

print("Summary has been saved to", output_file)
