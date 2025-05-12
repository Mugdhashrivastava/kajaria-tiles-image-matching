import cv2

# Load two images
img1 = cv2.imread("image1.jpg", cv2.IMREAD_GRAYSCALE)
img2 = cv2.imread("image2.jpg", cv2.IMREAD_GRAYSCALE)

# Create ORB detector
orb = cv2.ORB_create()

# Detect keypoints and descriptors
kp1, des1 = orb.detectAndCompute(img1, None)
kp2, des2 = orb.detectAndCompute(img2, None)

# Create a Brute-Force matcher and match descriptors
bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
matches = bf.match(des1, des2)

# Sort matches by distance (lower is better)
matches = sorted(matches, key=lambda x: x.distance)

# Draw top 50 matches
matched_image = cv2.drawMatches(img1, kp1, img2, kp2, matches[:50], None, flags=2)

# Show the result
cv2.imshow("Matches", matched_image)
cv2.waitKey(0)
cv2.destroyAllWindows()


print(img1 is None)  # Should print False
print(img2 is None)  # Should print False

