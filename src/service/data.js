 let  video = {
	videoId : 121,
	name: String,
	deviceId: String,
	imei: String,
	license: String,
	recordingMode: Number,
	address: String,
	location: {type: [Number], index: '2d'},
	isCollection: {type: Boolean, default: false},
	filePath: String,
	resolution: String,
	duration: Number,
	size: Number,
	thumbnail: String,
	progress: {type: Number, default: 0},
	province: '上海',
	city: String,
	errorMsg: String,
	status: {type: Number, default: 0},
	videoTime: 'SchemaTypes.Long',
    downloadUrl: String,
}
let req ={
	code:0,
	res:[]
}

for(let i=1;i<30;i++){
	req.res.push(video)
}

export {req}

