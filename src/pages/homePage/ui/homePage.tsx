import {
    Avatar,
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import styles from "./homePage.module.scss"
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../shared/lib/redux.ts";
import {
    ERole, getSortedAndFilteredEmployeesData,
    selectIEmployees
} from "../../../entities/employee";
import {useNavigate} from "react-router-dom";
import {ToolBar} from "../../../features/toolBar";

export const HomePage = () => {
    const data = useAppSelector(selectIEmployees)
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const leavePage = (id: number) => {
        navigate(`/soft-list-of-employees/${id}`)
        dispatch(getSortedAndFilteredEmployeesData({
            role: "",
            isArchive: false,
            type: "",
            order: "ASC"
        }))
    }
    return (
        <Box className={styles.homePage}>
            <ToolBar/>
            <Box className={styles.listLayout}>
                <List className={styles.list}>
                    {data.map((item) => {
                        return (
                            <React.Fragment key={item.id}>
                                <ListItem
                                    className={styles.item}
                                    onClick={() => {
                                        leavePage(item.id)
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar alt=""/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{display: 'block'}}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Должность: {ERole[item.role]}
                                                </Typography>
                                                <Typography
                                                    sx={{display: 'block'}}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    Номер телефона: {item.phone}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider component="li"/>
                            </React.Fragment>
                        )
                    })}
                </List>
            </Box>
        </Box>
    )
}