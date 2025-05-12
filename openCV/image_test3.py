#Detect Edges using Canny Algorithm
#The Canny algorithm is a step-by-step process to detect edges (sharp changes in brightness) in an image.

#Edges usually define object boundaries, which are important for tasks like image matching, object detection, etc.
# 100 = lower threshold

# 200 = upper threshold
# Two values (100 and 200) are thresholds that control sensitivityYou can tweak these to get better results.

import cv2

# Load the original image
image = cv2.imread("input.jpg")

# Convert to grayscale
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Apply Canny edge detection
edges = cv2.Canny(gray_image, threshold1=100, threshold2=200)

# Show the original and edges side by side
cv2.imshow("Original", image)
cv2.imshow("Edges", edges)

# Wait for key press
cv2.waitKey(0)

# Close windows
cv2.destroyAllWindows()
