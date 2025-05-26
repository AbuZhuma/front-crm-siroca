import { useEffect } from "react"
import { loadingStatus } from "./api/loadingStatus"
import styles from "./Loading.module.scss"
import { useMediaQuery } from "@/shared/hooks"

export const Loading = () => {
      const { status, setStatus } = loadingStatus()
      useEffect(() => {
                  setTimeout(() => {
                        setStatus("none")
                  }, 2000)
      }, [status])
      const width = useMediaQuery()
      const height = window.innerHeight
      if (status !== "none") {
            if (status === "global") {
                  return (
                        <div className={styles.containerGlobal}>
                              <div className={styles.sicle}></div>
                        </div>
                  )
            } else {
                  return (
                        <div style={{height: height, width: width }} className={styles.containerNorm}>
                              <div className={styles.sicle}></div>
                        </div>
                  )
            }

      } else {
            return null
      }
}