import { FC, useEffect, useState } from "react";
import styles from "./ProfileData.module.scss";
import axios from "axios";
import { Popover } from "antd";
import { NotifModal, ProfileModal } from "@/widgets";
import { Notification } from "iconsax-react";
import { BASE_URL, authToken } from "@/shared/variables";
import { profileApi } from "@/shared/api";
import { INotification } from "@/widgets/NotifModal/ui/NewNotification/NewNotification";

export const ProfileData: FC = () => {
    const [count, setCount] = useState<number>(0);
    const [isHave, setIsHave] = useState<boolean>(false)
    const [notifications, setNotifications] = useState<{ new: INotification[], read: INotification[] }>({ new: [], read: [] })
    const getCounts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/applications/notifications/`, authToken);
            setCount(response.data.new.length)
            setNotifications(response.data)
            if (response.data.new.length || response.data.read.length) setIsHave(true)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getCounts();
    }, []);
    const { profileState } = profileApi();
    const [notifOpen, setNotifOpen] = useState<boolean>(false);
    const notifOpenChange = (newOpen: boolean) => {
        setNotifOpen(newOpen);
    };
    const [profileOpen, setProfileOpen] = useState<boolean>(false);
    const profileOpenChange = (newOpen: boolean) => {
        setProfileOpen(newOpen);
    };
    return (
        <div className={styles.ProfileData}>
            <Popover
                placement="bottomRight"
                content={<NotifModal isHave={isHave} setIsHave={setIsHave} notifications={notifications} getNotification={getCounts} setClose={setNotifOpen} />}
                trigger={"click"}
                open={notifOpen}
                onOpenChange={notifOpenChange}
            >
                <button
                    aria-label="notif"
                    className={styles.NotifButton}
                >
                    <Notification
                        size={34}
                        variant={"Bold"}
                        color="#717171"
                    />
                    {count ? <div className={styles.NotifNumber}>{count}</div> : null}
                </button>
            </Popover>
            <Popover
                placement="bottomRight"
                content={<ProfileModal setModal={setProfileOpen} />}
                trigger={"click"}
                open={profileOpen}
                onOpenChange={profileOpenChange}
            >
                <button
                    aria-label="profile"
                    className={styles.ProfileButton}
                >
                    {!profileState.image ?
                        <div className={styles.defoltAvatar}>
                            <p>{profileState.first_name?.slice(0, 1) + profileState.surname?.slice(0, 1)}</p>
                        </div>
                        :
                        <img
                            alt="profile"
                            src={String(profileState.image)}
                        />
                    }

                    <p>Мой профиль</p>
                </button>
            </Popover>
        </div>
    );
};
