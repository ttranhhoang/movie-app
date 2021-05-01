import React from "react";
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Card,
  Box,
  Typography,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));
function Benefits(props) {
  const classes = useStyles();
  return (
    <Card>
      <Box py={2} px={3} color="white" bgcolor="#142851">
        <Typography component="h6" variant="h6">
          Lợi ích khi là thành viên
        </Typography>
      </Box>
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <CheckIcon />
          </ListItemAvatar>
          <ListItemText primary="Tìm nội dung nào đó để xem trên các dịch vụ phát trực tuyến đã đăng ký của bạn" />
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <CheckIcon />
          </ListItemAvatar>
          <ListItemText primary="Ghi nhật ký các bộ phim và chương trình truyền hình bạn đã xem" />
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <CheckIcon />
          </ListItemAvatar>
          <ListItemText primary="Theo dõi các bộ phim và chương trình truyền hình yêu thích của bạn và nhận các đề xuất từ ​​chúng" />
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <CheckIcon />
          </ListItemAvatar>
          <ListItemText primary="Xây dựng và duy trì danh sách theo dõi cá nhân" />
        </ListItem>
      </List>
    </Card>
  );
}

export default Benefits;
