//
//  User.swift
//  InstagramFirebase
//
//  Created by Chase McElroy on 2/20/18.
//  Copyright © 2018 Chase McElroy. All rights reserved.
//

import Foundation

struct User {
    let username: String
    let profileImageUrl: String
    
    init(dictionary: [String: Any]) {
        self.username = dictionary["username"] as? String ?? ""
        self.profileImageUrl = dictionary["profileImageUrl"] as? String ?? ""
    }
}
