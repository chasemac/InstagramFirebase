//
//  UserProfilePhotoCell.swift
//  InstagramFirebase
//
//  Created by Chase McElroy on 2/16/18.
//  Copyright © 2018 Chase McElroy. All rights reserved.
//

import UIKit

class UserProfilePhotoCell: UICollectionViewCell {
    
    var post: Post? {
        didSet {
            print(post?.imageUrl ?? "")
            guard let imageUrl = post?.imageUrl else {return}
            guard let url = URL(string: imageUrl) else {return}
            
            URLSession.shared.dataTask(with: url) { (data, response, err) in
                // check for the error, then construct the image using data
                if let err = err {
                    print("failed to fetch profle image:", err)
                    return
                }
                // perhaps check for repsonse status of 200 (HTTP OK)
                
                guard let data = data else {return}
                
                let image = UIImage(data: data)
                
                // need to get back on main UI thread
                DispatchQueue.main.async {
                    self.photoImageView.image = image
                }
                }.resume()
        }
    }
    
    let photoImageView: UIImageView = {
        let iv = UIImageView()
        iv.backgroundColor = .red
        iv.contentMode = .scaleAspectFill
        iv.clipsToBounds = true
        return iv
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        addSubview(photoImageView)
        photoImageView.anchor(top: topAnchor, left: leftAnchor, bottom: bottomAnchor, right: rightAnchor, paddingTop: 0, paddingLeft: 0, paddingBottom: 0, paddingRight: 0, width: 0, height: 0)
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
