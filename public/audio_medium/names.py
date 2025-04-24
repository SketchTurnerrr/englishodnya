import os

def extract_words_from_audio_files(directory, output_file):
    """
    Extracts words from audio filenames in a directory and writes them to a text file.

    Args:
        directory (str): The path to the directory containing the audio files.
        output_file (str): The path to the output text file.
    """
    try:
        with open(output_file, 'w') as outfile:
            for filename in os.listdir(directory):
                if filename.endswith(( '.ogg' )):  # Add more extensions as needed
                    word = os.path.splitext(filename)[0].split('_')[0]  # Remove extension
                    outfile.write(word + '\n')
        print(f"Words extracted and saved to {output_file}")

    except FileNotFoundError:
        print(f"Error: Directory not found: {directory}")
    except Exception as e:
        print(f"An error occurred: {e}")


# Example usage:
audio_directory = 'x:/dev/engclerk/public/audio_medium'
output_text_file = 'x:/dev/engclerk/public/audio_medium/words.txt'
extract_words_from_audio_files(audio_directory, output_text_file)
