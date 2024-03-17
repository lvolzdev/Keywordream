import React from 'react'
import styles from "./Keyword.module.css";

export default function Keyword({keywords}) {
  return (
    <div className={styles.container}>
      {
        keywords.map((keyowrd, index) => {
          return(
            <div className={styles.item} key={index}>
              {keyowrd}
            </div>
          )
        })  
      }
    </div>
  )
}
