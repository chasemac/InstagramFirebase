//
//  CustomImageView.swift
//  InstagramFirebase
//
//  Created by Chase McElroy on 2/16/18.
//  Copyright © 2018 Chase McElroy. All rights reserved.
//

import UIKit

var imageCache = [String: UIImage]()

class CustomImageView: UIImageView {
    var lastURLUsedToLoadImage: String?
    
    func loadImage(urlString: String) {
        
        lastURLUsedToLoadImage = urlString
        
        if let cachedImage = imageCache[urlString] {
            self.image = cachedImage
            return
        }
        guard let url = URL(string: urlString) else {return}
        
        URLSession.shared.dataTask(with: url) { (data, response, err) in
            // check for the error, then construct the image using data
            if let err = err {
                print("failed to fetch profle image:", err)
                return
            }
            
            if url.absoluteString != self.lastURLUsedToLoadImage {
                return
            }
            // perhaps check for repsonse status of 200 (HTTP OK)
            
            guard let imageData = data else {return}
            
            let photoImage = UIImage(data: imageData)
            
            imageCache[url.absoluteString] = photoImage
            
            // need to get back on main UI thread
            DispatchQueue.main.async {
                self.image = photoImage
            }
            }.resume()
    }
}
