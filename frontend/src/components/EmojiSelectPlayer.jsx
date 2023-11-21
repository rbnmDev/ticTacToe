import React from "react";

const EmojiSelectPlayer = ({ onEmojiSuccess }) => {
  const emojiList = ["🤪", "😎", "🥳", "🤩", "😋"];

  const handleClick = (emoji) => {
    onEmojiSuccess(emoji); // Llama a onEmojiSuccess con el emoji seleccionado
  };

  return (
    <section className='emoji__selection'>
      <h3>¿Quién serás hoy?</h3>
      <ul className='emoji__list'>
        {emojiList.map((emoji) => (
          <li
            key={emoji}
            onClick={() => handleClick(emoji)}
            className='emoji__item'
          >
            {emoji}
          </li>
        ))}
      </ul>
    </section>
  );
};



export default EmojiSelectPlayer;
