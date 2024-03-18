import React from 'react'
import styles from "./Tag.module.css";

export default function Tag({tags}) {
  return (
    <div className={styles.container}>
      {
        tags.map((tag, index) => {
          return(
            <div className={styles.item} key={index}>
              {tag}
            </div>
          )
        })  
      }
    </div>
  )
}
