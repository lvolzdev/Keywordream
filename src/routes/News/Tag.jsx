import React from 'react'
import styles from "./Tag.module.css";

export default function Tag({tags, changeNewsList}) {
  return (
    <div className={styles.container}>
      <div 
        className={styles.item} 
        key={-1}
        onClick={() => changeNewsList("")}
      >
        ALL
      </div>
      {
        tags.map((tag, index) => {
          return(
            <div 
              className={styles.item} 
              key={index}
              onClick={() => changeNewsList(tag)}
            >
              {tag}
            </div>
          )
        })  
      }
    </div>
  )
}
