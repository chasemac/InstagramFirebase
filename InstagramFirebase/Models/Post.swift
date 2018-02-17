//
//  Post.swift
//  InstagramFirebase
//
//  Created by Chase McElroy on 2/16/18.
//  Copyright © 2018 Chase McElroy. All rights reserved.
//

import Foundation

struct Post {
    let imageUrl: String
    
    init(dictionary: [String: Any]) {
        self.imageUrl = dictionary["imageUrl"] as? String ?? ""
    }
}
