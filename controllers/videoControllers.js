
import routes from "../routes";
import Video from "../models/Video";


export const home = async(req,res)=> 
{
    try{
        const videosDb = await Video.find({});
        res.render("home", {pageTitle:"Home", videosDb});
    }
    catch(error)
    {
        console.log(error);
        res.render("home", {pageTitle:"Home", videosDb:[]});
    }
};


export const search = (req,res)=> {
    const {
        query: { term:searchingBy } 
    } = req;
    // const searchingBy = req.query.term 위에 거랑 동일하다
    res.render("search", {pageTitle:"Search", searchingBy, videosDb });
};

export const videos = (req,res) => res.render("videos",{pageTitle:"Videos"});

export const getUpload = (req,res) => {
    res.render("upload",{pageTitle:"Upload"});
}
export const postUpload = (req,res) => {
    const {
        body: {file,title,description,} 
    } = req ;
    // To Do : Upload ansd save video
    res.redirect(routes.videoDetail(324393));
};


export const videoDetail = (req,res) => res.render("videoDetail",{pageTitle:"Video Detail"});
export const editVideo = (req,res) => res.render("editVideo",{pageTitle:"Edit Video"});
export const deleteVideo = (req,res) => res.render("deleteVideo",{pageTitle:"Delete Video"});