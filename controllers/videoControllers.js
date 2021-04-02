import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  const videosDb = await Video.find({});
  try {
    res.render("home", { pageTitle: "Home", videosDb });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videosDb: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videosDb = []; // let의 경우 재선언이 가능하다, 그래서 값을 바꾸지 않으려면 const를 사용해야한다.
  try {
    videosDb = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  // const searchingBy = req.query.term 위에 거랑 동일하다
  res.render("search", { pageTitle: "Search", searchingBy, videosDb });
};

export const videos = (req, res) =>
  res.render("videos", { pageTitle: "Videos" });

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title: title,
    description: description,
  });
  console.log(newVideo);
  // To Do : Upload ansd save video
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    await Video.findByIdAndRemove({ _id: id });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.videoDetail(id));
  }
};
//res.render("deleteVideo",{pageTitle:"Delete Video"});
