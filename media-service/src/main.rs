use marine_rs_sdk::marine;
use marine_rs_sdk::module_manifest;
use std::io::Cursor;
use image;
use std::path::Path;

module_manifest!();

pub fn main() {}

#[marine]
pub fn imageresize(path: String,height:u32,width:u32) -> Vec<u8> {
    let path = Path::new(&path);
    let img = image::open(path).unwrap();
    let imgbuf = image::imageops::resize(&img, height, width,image::imageops::FilterType::Lanczos3);
    let mut bytes: Vec<u8> = Vec::new();
    imgbuf.write_to(&mut Cursor::new(&mut bytes), image::ImageOutputFormat::Png);
    bytes
}
