//
//  LoginController.swift
//  InstagramFirebase
//
//  Created by Chase McElroy on 2/15/18.
//  Copyright © 2018 Chase McElroy. All rights reserved.
//

import UIKit

class LoginController: UIViewController {
    
    let signUpButton: UIButton = {
       let button = UIButton(type: .system)
        button.setTitle("Don't have an account? Sign Up.", for: .normal)
        button.addTarget(self, action: #selector(handleShowSignup), for: .touchUpInside)
        return button
    }()
    
    @objc func handleShowSignup() {
        let signUpController = SignUpController()
        navigationController?.pushViewController(signUpController, animated: true)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navigationController?.isNavigationBarHidden = true
        view.backgroundColor = .white
        
        view.addSubview(signUpButton)
        signUpButton.anchor(top: nil, left: view.leftAnchor, bottom: view.bottomAnchor, right: view.rightAnchor, paddingTop: 0, paddingLeft: 0, paddingBottom: 0, paddingRight: 0, width: 0, height: 50)
    }
}
