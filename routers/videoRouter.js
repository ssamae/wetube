import express from "express";
import {
  deleteVideo,
  getEditVideo,
  getUpload,
  postEditVideo,
  postUpload,
  videoDetail,
  videos,
} from "../controllers/videoControllers";
import { uploadVideo } from "../middlewares";

import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.home, videos);

// Video Upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Video Edit
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

// Video Delete
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;
